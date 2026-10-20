import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ALBUMS, isAvailable, trackSeconds } from "../musicLibrary";
import type { Album, AlbumIcon, LibraryTrack } from "../musicLibrary";
import { BACKGROUND_MUSIC_PLAY_EVENT, formatSeconds } from "../music";

/** 12x12 pixel icons for albums without cover art ("#" = filled). */
const ICONS: Record<AlbumIcon, string[]> = {
  note: [
    "............",
    "....#######.",
    "....#######.",
    "....#.....#.",
    "....#.....#.",
    "....#.....#.",
    "....#.....#.",
    "..###...###.",
    ".####..####.",
    ".####..####.",
    "..##....##..",
    "............",
  ],
  gamepad: [
    "............",
    "............",
    "..########..",
    ".##########.",
    "###.#####.##",
    "##...###.#.#",
    "###.#####.##",
    "############",
    "###......###",
    ".##......##.",
    "............",
    "............",
  ],
  disc: [
    "............",
    "....####....",
    "..##....##..",
    ".#........#.",
    ".#...##...#.",
    "#...#..#...#",
    "#...#..#...#",
    ".#...##...#.",
    ".#........#.",
    "..##....##..",
    "....####....",
    "............",
  ],
};

const PixelIcon = ({ icon }: { icon: AlbumIcon }) => (
  <svg viewBox="0 0 12 12" width="100%" height="100%" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
    {ICONS[icon].flatMap((row, y) =>
      [...row.matchAll(/#+/g)].map((m) => <rect key={`${y}-${m.index}`} x={m.index} y={y} width={m[0].length} height={1} />),
    )}
  </svg>
);

const AlbumCover = ({ album }: { album: Album }) => (
  <div className="ase-music-cover">
    {"image" in album.cover ? (
      <img src={album.cover.image} alt={album.cover.alt} loading="lazy" />
    ) : (
      <PixelIcon icon={album.cover.icon} />
    )}
  </div>
);

type Current = { album: Album; track: LibraryTrack };

const playableTracks = (album: Album) => album.tracks.filter(isAvailable);

const totalSeconds = (album: Album) => playableTracks(album).reduce((sum, t) => sum + (trackSeconds(t) ?? 0), 0);

/**
 * The Music section of portfolio.ase: albums with their track lists and one shared player, so only
 * one track plays at a time. Starting a track pauses the background music and any other audio on the
 * page; turning the background music on pauses this player.
 */
const Music = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState<Set<string>>(() => new Set([ALBUMS[0]?.id]));

  // Pause when the background music starts or when another player on the page starts.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const pause = () => audio.pause();
    const onOtherPlay = (e: Event) => {
      if (e.target !== audio && e.target instanceof HTMLMediaElement) audio.pause();
    };
    document.addEventListener(BACKGROUND_MUSIC_PLAY_EVENT, pause);
    document.addEventListener("play", onOtherPlay, true);
    return () => {
      audio.pause();
      document.removeEventListener(BACKGROUND_MUSIC_PLAY_EVENT, pause);
      document.removeEventListener("play", onOtherPlay, true);
    };
  }, []);

  const start = useCallback((album: Album, track: LibraryTrack) => {
    const audio = audioRef.current;
    if (!audio || !isAvailable(track)) return;
    setCurrent({ album, track });
    setTime(0);
    setDuration(trackSeconds(track) ?? 0);
    audio.src = track.src;
    audio.play().catch(() => setPlaying(false));
  }, []);

  const toggle = useCallback(
    (album: Album, track: LibraryTrack) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (current?.track.src === track.src) {
        if (audio.paused) audio.play().catch(() => setPlaying(false));
        else audio.pause();
      } else {
        start(album, track);
      }
    },
    [current, start],
  );

  const neighbours = useMemo(() => {
    if (!current) return { prev: null, next: null };
    const list = playableTracks(current.album);
    const i = list.findIndex((t) => t.src === current.track.src);
    return { prev: list[i - 1] ?? null, next: list[i + 1] ?? null };
  }, [current]);

  const playNext = () => {
    if (current && neighbours.next) start(current.album, neighbours.next);
  };

  const playPrev = () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.currentTime > 3 || !neighbours.prev) audio.currentTime = 0;
    else start(current.album, neighbours.prev);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(value)) audio.currentTime = value;
    setTime(value);
  };

  const toggleAlbum = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Keep the canvas tools (bucket, zoom, eraser) from reacting to clicks on the player controls.
  const stopToolClicks = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, input, audio")) e.stopPropagation();
  };

  const progress = duration > 0 ? Math.min(time / duration, 1) : 0;

  return (
    <div className="ase-section" id="music" onClick={stopToolClicks}>
      <div className="ase-separator">// MUSIC</div>

      <p style={{ marginBottom: 16 }}>
        Music I compose and produce in Ableton Live: soundtracks for my own games, client commissions and
        standalone pieces. Pick an album, then a track; one plays at a time.
      </p>

      {/* One shared element for the whole section; in the DOM so the background music hears its "play". */}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={(e) => {
          setPlaying(true);
          // One track at a time: also pause the native players on the project cards.
          for (const media of document.querySelectorAll("audio, video")) {
            if (media !== e.currentTarget) (media as HTMLMediaElement).pause();
          }
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          playNext();
        }}
      />

      {ALBUMS.map((album) => {
        const isOpen = open.has(album.id);
        const available = playableTracks(album).length;
        const pending = album.tracks.length - available;
        const listId = `music-tracks-${album.id}`;
        let lastSection: string | undefined;
        return (
          <div key={album.id} className="ase-card ase-music-album">
            <div className="ase-card-title">
              <span aria-hidden="true">💿</span>
              <span style={{ overflowWrap: "anywhere" }}>{album.id}.wav</span>
              <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8, whiteSpace: "nowrap" }}>
                {available > 0 ? `${available} track${available === 1 ? "" : "s"} · ${formatSeconds(totalSeconds(album))}` : "Coming soon"}
              </span>
            </div>
            <div className="ase-card-body">
              <div className="ase-music-head">
                <AlbumCover album={album} />
                <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                  <h3 className="ase-music-album-title">{album.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                    <span className="ase-tag ase-tag-primary">{album.kind}</span>
                    {pending > 0 && (
                      <span className="ase-tag">
                        {available === 0 ? "Recording in progress · coming soon" : `${pending} coming soon`}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, marginBottom: album.fineprint ? 8 : 12 }}>{album.description}</p>
                  {album.fineprint && <p className="ase-music-fineprint">{album.fineprint}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <button
                      type="button"
                      className="ase-btn"
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      onClick={() => toggleAlbum(album.id)}
                    >
                      {isOpen ? "▾ Hide tracks" : `▸ Show ${album.tracks.length} tracks`}
                    </button>
                    {available > 0 && (
                      <button
                        type="button"
                        className="ase-btn ase-btn-primary"
                        onClick={() => {
                          setOpen((prev) => new Set(prev).add(album.id));
                          start(album, playableTracks(album)[0]);
                        }}
                        aria-label={`Play ${album.title} from the first track`}
                      >
                        ▶ Play album
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {isOpen && (
                <ol id={listId} className="ase-music-list" aria-label={`Tracks of ${album.title}`}>
                  {album.tracks.map((track, i) => {
                    const secs = trackSeconds(track);
                    const isCurrent = current?.track.src === track.src;
                    const heading = track.section !== lastSection ? track.section : undefined;
                    lastSection = track.section;
                    const body = (
                      <>
                        <span className="ase-music-index" aria-hidden="true">
                          {isCurrent ? (playing ? "❚❚" : "▶") : String(i + 1).padStart(2, "0")}
                        </span>
                        {track.cover && <img className="ase-music-thumb" src={track.cover} alt="" loading="lazy" />}
                        <span className="ase-music-text">
                          <span className="ase-music-title">{track.title}</span>
                          <span className="ase-music-note">{track.note}</span>
                          {isCurrent && (
                            <span className="ase-music-meter" aria-hidden="true">
                              <span style={{ width: `${progress * 100}%` }} />
                            </span>
                          )}
                        </span>
                        <span className="ase-music-length">{secs !== null ? formatSeconds(secs) : "Coming soon"}</span>
                      </>
                    );
                    return (
                      <li key={track.id}>
                        {heading && <div className="ase-music-section">{heading}</div>}
                        {secs !== null ? (
                          <button
                            type="button"
                            className={`ase-music-track${isCurrent ? " active" : ""}`}
                            onClick={() => toggle(album, track)}
                            aria-label={`${isCurrent && playing ? "Pause" : "Play"} ${track.title}, ${formatSeconds(secs)}`}
                            aria-current={isCurrent ? "true" : undefined}
                          >
                            {body}
                          </button>
                        ) : (
                          <div className="ase-music-track pending">{body}</div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        );
      })}

      {current && (
        <div className="ase-music-player" role="region" aria-label="Music player">
          <div className="ase-music-controls">
            <button type="button" className="ase-btn" onClick={playPrev} aria-label="Previous track or restart">
              |◀
            </button>
            <button
              type="button"
              className="ase-btn ase-btn-primary"
              onClick={() => toggle(current.album, current.track)}
              aria-label={playing ? `Pause ${current.track.title}` : `Play ${current.track.title}`}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button type="button" className="ase-btn" onClick={playNext} disabled={!neighbours.next} aria-label="Next track">
              ▶|
            </button>
          </div>
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <div className="ase-music-now" aria-live="polite">
              <strong>{current.track.title}</strong>
              <span style={{ opacity: 0.75 }}> · {current.album.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="range"
                className="ase-range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(time, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek"
                aria-valuetext={`${formatSeconds(time)} of ${formatSeconds(duration)}`}
                style={{ ["--progress" as string]: `${progress * 100}%` }}
              />
              <span className="ase-music-time">
                {formatSeconds(time)} / {formatSeconds(duration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
