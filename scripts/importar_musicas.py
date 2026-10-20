"""Imports the audio of the Music section and regenerates src/musicAudio.ts.

Run from anywhere (the paths are absolute or relative to this repository):

    "%LOCALAPPDATA%\\Programs\\Python\\Python312\\python.exe" -I scripts/importar_musicas.py [--force]

What it does, for every source in SOURCES:
  * finds the source audio (WAV first, then FLAC or OGG) and converts it to MP3,
    192 kbps CBR at the source sample rate (44.1 or 48 kHz), into public/music/<folder>/<slug>.mp3;
  * copies files that are already compressed (the .m4a of Late Bus Home) and the cover images;
  * reads the length of every file the section expects and writes src/musicAudio.ts,
    with null for what has no audio yet (the page shows it as "coming soon").

Idempotent: a file is converted again only when the source is newer than the MP3 (or with --force),
and src/musicAudio.ts is rewritten only when its content changes. Needs soundfile (libsndfile >= 1.1)
and numpy. Nothing outside this repository is written.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import struct
import sys
from dataclasses import dataclass
from pathlib import Path

import numpy as np
import soundfile as sf

REPO = Path(__file__).resolve().parent.parent
PUBLIC = REPO / "public"
GENERATED = REPO / "src" / "musicAudio.ts"
LIBRARY = REPO / "src" / "musicLibrary.ts"

DOCS = Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Documents"
HAYWOOD_WAV = DOCS / "Haywood-Valley" / "assets" / "sons" / "wav"
ANIME_AUDIO = DOCS / "Portfolio-Trilhas" / "audio"
CLIENT_AUDIO = DOCS / "Trabalhos" / "Jogo-Acao" / "audio" / "music"
DRAFT_MUSIC = DOCS / "portfolio_musica-em-andamento" / "public" / "music" / "portfolio"

# libsndfile maps compression 0..1 to 320..32 kbps in constant bitrate mode: (320 - 192) / 288.
MP3_COMPRESSION = (320 - 192) / (320 - 32)
SOURCE_EXTENSIONS = (".wav", ".flac", ".ogg")


@dataclass
class Item:
    """One track: where its audio comes from (None = no known source) and where it goes."""

    source_dir: Path | None
    source_stem: str | None
    dest: str  # public path, e.g. "music/haywood-new/the-valley-wakes.mp3"


def kebab(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def group(folder: str, source_dir: Path | None, pairs: list[tuple[str | None, str]], ext: str = ".mp3") -> list[Item]:
    return [Item(source_dir, stem, f"music/{folder}/{kebab(slug)}{ext}") for stem, slug in pairs]


SOURCES: dict[str, list[Item]] = {
    # 2. Haywood Valley, New Soundtrack (2026): the keys of the game's sound registry.
    "haywood-new": group("haywood-new", HAYWOOD_WAV, [
        ("musica.titulo", "the-valley-wakes"),
        ("musica.personalizar", "in-front-of-the-mirror"),
        ("musica.sala_dia", "tea-by-the-window-day"),
        ("musica.sala_noite", "tea-by-the-window-night"),
        ("musica.ilha_manha", "gentle-tide-morning"),
        ("musica.ilha_dia", "gentle-tide-day"),
        ("musica.ilha_tarde", "gentle-tide-evening"),
    ]),
    # 3. Anime-inspired pieces: Portfolio-Trilhas\audio\portfolio.<series>.<name>.wav, still being recorded.
    "anime": group("anime", ANIME_AUDIO, [
        ("portfolio.bleach.ceu_partido", "shattered-sky"),
        ("portfolio.bleach.lua_negra", "black-moon-over-the-asphalt"),
        ("portfolio.bleach.chuva_cidade_vazia", "rain-over-the-empty-city"),
        ("portfolio.onepiece.horizonte_dourado", "toward-the-golden-horizon"),
        ("portfolio.onepiece.tempestade_conves", "storm-on-the-deck"),
        ("portfolio.onepiece.despedida_cais", "farewell-at-the-pier"),
        ("portfolio.naruto.vento_telhados", "wind-over-the-rooftops"),
        ("portfolio.naruto.laminas_neblina", "blades-in-the-mist"),
        ("portfolio.naruto.cinzas_cerejeira", "cherry-blossom-ashes"),
        ("portfolio.dragonball.explosao_horizonte", "blast-on-the-horizon"),
        ("portfolio.dragonball.choque_planalto", "clash-on-the-plateau"),
        ("portfolio.dragonball.antes_transformacao", "before-the-transformation"),
    ]),
    # 4. Client work, Action Game Music Pack.
    "client-action": group("client-action", CLIENT_AUDIO, [
        ("heroes_dash", "heroes-dash"),
        ("turbo_rush", "turbo-rush"),
        ("hot_pursuit", "hot-pursuit"),
        ("big_bad_boss", "big-bad-boss"),
        ("sneaky_business", "sneaky-business"),
        ("sky_high", "sky-high"),
        ("victory_lap", "victory-lap"),
    ]),
    # 5. Other pieces. Late Bus Home is already an .m4a (copied as is); the other two have no audio yet:
    # drop a WAV next to the draft's .m4a (or the MP3 straight into public/music/other/) and run again.
    "other": [
        Item(DRAFT_MUSIC, "late-bus-home", "music/other/late-bus-home.m4a"),
        Item(DRAFT_MUSIC, "beyond-the-ember-peaks", "music/other/beyond-the-ember-peaks.mp3"),
        Item(DRAFT_MUSIC, "wildfire-resolve", "music/other/wildfire-resolve.mp3"),
    ],
}

# 1. Haywood Valley, Original Soundtrack: already in public/music/*.m4a, only measured.
ORIGINAL_DIR = PUBLIC / "music"

COVERS = [
    (DRAFT_MUSIC / "covers" / f"{name}.png", f"music/covers/{name}.png")
    for name in ("late-bus-home", "beyond-the-ember-peaks", "wildfire-resolve")
]


def m4a_seconds(path: Path) -> float | None:
    """Length of an MP4/M4A from its movie header (mvhd); libsndfile does not read AAC."""
    data = path.read_bytes()
    i = data.find(b"mvhd")
    if i < 0:
        return None
    version = data[i + 4]
    if version == 1:
        timescale, duration = struct.unpack(">IQ", data[i + 24 : i + 36])
    else:
        timescale, duration = struct.unpack(">II", data[i + 16 : i + 24])
    return duration / timescale if timescale else None


def seconds_of(path: Path) -> float | None:
    if not path.exists():
        return None
    if path.suffix.lower() in (".m4a", ".mp4", ".aac"):
        return m4a_seconds(path)
    return sf.info(str(path)).duration


def find_source(item: Item) -> Path | None:
    if item.source_dir is None or item.source_stem is None:
        return None
    dest_ext = Path(item.dest).suffix.lower()
    candidates = [dest_ext] if dest_ext != ".mp3" else list(SOURCE_EXTENSIONS)
    for ext in candidates:
        path = item.source_dir / f"{item.source_stem}{ext}"
        if path.exists():
            return path
    return None


def is_stale(source: Path, dest: Path, force: bool) -> bool:
    return force or not dest.exists() or source.stat().st_mtime > dest.stat().st_mtime


def to_mp3(source: Path, dest: Path) -> None:
    data, rate = sf.read(str(source), dtype="float32", always_2d=True)
    if rate not in (44100, 48000):
        raise SystemExit(f"{source}: {rate} Hz; expected 44.1 or 48 kHz")
    peak = float(np.abs(data).max()) if data.size else 0.0
    if peak > 0.999:
        print(f"  warning: {source.name} peaks at {peak:.3f}; scaled down to avoid clipping")
        data = data * (0.98 / peak)
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_name(dest.stem + ".tmp.mp3")
    sf.write(str(tmp), data, rate, format="MP3", subtype="MPEG_LAYER_III",
             bitrate_mode="CONSTANT", compression_level=MP3_COMPRESSION)
    tmp.replace(dest)


def copy_if_stale(source: Path, dest: Path, force: bool) -> bool:
    if not is_stale(source, dest, force):
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, dest)
    return True


def render(durations: dict[str, float | None]) -> str:
    lines = [
        "// Generated by scripts/importar_musicas.py. Do not edit by hand; run:",
        '//   "%LOCALAPPDATA%\\Programs\\Python\\Python312\\python.exe" -I scripts/importar_musicas.py',
        "// Length in seconds of every audio file the Music section knows about. null = no audio yet",
        "// (shown as \"coming soon\").",
        "export const AUDIO_SECONDS: Record<string, number | null> = {",
    ]
    for src, secs in durations.items():
        lines.append(f'  "{src}": {"null" if secs is None else f"{secs:.2f}"},')
    lines.append("};")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--force", action="store_true", help="convert and copy again even when up to date")
    args = parser.parse_args()

    durations: dict[str, float | None] = {}

    for original in sorted(ORIGINAL_DIR.glob("*.m4a")):
        durations[f"/music/{original.name}"] = seconds_of(original)

    converted = copied = 0
    pending: list[str] = []
    for name, items in SOURCES.items():
        for item in items:
            dest = PUBLIC / item.dest
            source = find_source(item)
            if source is not None:
                if dest.suffix.lower() == ".mp3" and source.suffix.lower() != ".mp3":
                    if is_stale(source, dest, args.force):
                        print(f"  {name}: {source.name} -> {item.dest}")
                        to_mp3(source, dest)
                        converted += 1
                elif copy_if_stale(source, dest, args.force):
                    print(f"  {name}: copied {source.name} -> {item.dest}")
                    copied += 1
            secs = seconds_of(dest)
            if secs is None:
                pending.append(item.dest)
            durations[f"/{item.dest}"] = secs

    for source, dest in COVERS:
        if source.exists() and copy_if_stale(source, PUBLIC / dest, args.force):
            print(f"  cover: copied {source.name} -> {dest}")
            copied += 1

    text = render(durations)
    old = GENERATED.read_text(encoding="utf-8") if GENERATED.exists() else ""
    if text != old:
        GENERATED.write_text(text, encoding="utf-8", newline="\n")
        print(f"wrote {os.path.relpath(GENERATED, REPO)}")
    else:
        print(f"{os.path.relpath(GENERATED, REPO)} is up to date")

    # The catalog (src/musicLibrary.ts) is written by hand: warn when it does not name a file this script imports.
    if LIBRARY.exists():
        library = LIBRARY.read_text(encoding="utf-8")
        for item in (i for items in SOURCES.values() for i in items):
            if f'"{Path(item.dest).stem}"' not in library:
                print(f"  warning: no track with id \"{Path(item.dest).stem}\" in src/musicLibrary.ts (/{item.dest})")

    print(f"{converted} converted, {copied} copied, {len(durations) - len(pending)} with audio, {len(pending)} pending")
    for dest in pending:
        print(f"  pending: {dest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
