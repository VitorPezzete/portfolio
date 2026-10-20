import { AUDIO_SECONDS } from "./musicAudio";
import { TRACKS, trackSrc } from "./music";

/**
 * Catalog of the Music section, written by hand. Audio lengths come from src/musicAudio.ts, which
 * scripts/importar_musicas.py generates: a track whose file has no length there is "coming soon".
 * Every text here is shown on the site, so it stays in English.
 */

/** The client's permission to show the Action Game Music Pack may be pending: false hides that album. */
export const SHOW_CLIENT_WORK = true;

export type AlbumIcon = "disc" | "note" | "gamepad";

export type LibraryTrack = {
  id: string;
  title: string;
  /** Expected public path of the audio; the key in AUDIO_SECONDS. */
  src: string;
  /** One line under the title: use, key, tempo, instruments. */
  note: string;
  /** Sub-heading inside the album (e.g. "In the style of Bleach"). */
  section?: string;
  cover?: string;
};

export type Album = {
  id: string;
  title: string;
  /** Short label shown as a tag. */
  kind: string;
  description: string;
  /** Small print under the description (credits, disclaimers). */
  fineprint?: string;
  cover: { image: string; alt: string } | { icon: AlbumIcon };
  tracks: LibraryTrack[];
};

/** Length in seconds, or null while the audio is not there yet. */
export const trackSeconds = (track: LibraryTrack): number | null => AUDIO_SECONDS[track.src] ?? null;
export const isAvailable = (track: LibraryTrack) => trackSeconds(track) !== null;

const haywoodOriginal: Album = {
  id: "haywood-original",
  title: "Haywood Valley — Original Soundtrack",
  kind: "Game soundtrack",
  description:
    "Original music I composed for the game, played on orchestral woodwinds in Ableton Live. The main theme has one arrangement per time of day, so the game can crossfade between them as the hours pass.",
  cover: { image: "/projects/haywood/house-day.jpg", alt: "The player's house in Haywood Valley at noon" },
  tracks: TRACKS.map((t) => ({ id: t.id, title: t.title, src: trackSrc(t), note: t.note, section: t.group })),
};

const haywoodNew: Album = {
  id: "haywood-new",
  title: "Haywood Valley — New Soundtrack (2026)",
  kind: "Game soundtrack",
  description:
    "Seven new pieces for the rebuilt game. Each place has one piece in several versions, morning, day, evening or night, that share tempo, harmony and length, so the game can crossfade between them as the clock turns. Places play a piece once and let the ambience breathe before it returns; menus loop seamlessly.",
  cover: { image: "/projects/haywood/island.jpg", alt: "A small island in the open sea in Haywood Valley" },
  tracks: [
    {
      id: "the-valley-wakes",
      title: "The Valley Wakes",
      src: "/music/haywood-new/the-valley-wakes.mp3",
      section: "Title and menus",
      note: "Title screen loop · D major, 96 BPM · flute melody, horn and strings in the middle section, guitar, pizzicato and glockenspiel",
    },
    {
      id: "in-front-of-the-mirror",
      title: "In Front of the Mirror",
      src: "/music/haywood-new/in-front-of-the-mirror.mp3",
      section: "Title and menus",
      note: "Character creation loop · G major, 112 BPM · music box, pizzicato strings, celesta and marimba, light enough for minutes of picking a hairstyle",
    },
    {
      id: "tea-by-the-window-day",
      title: "Tea by the Window (Day)",
      src: "/music/haywood-new/tea-by-the-window-day.mp3",
      section: "At home",
      note: "Indoors by day · a slow piano waltz in E-flat, 88 BPM · the vibraphone quotes the title theme in 3/4",
    },
    {
      id: "tea-by-the-window-night",
      title: "Tea by the Window (Night)",
      src: "/music/haywood-new/tea-by-the-window-night.mp3",
      section: "At home",
      note: "The same piece at night, almost a lullaby · soft piano, music box and quiet strings",
    },
    {
      id: "gentle-tide-morning",
      title: "Gentle Tide (Morning)",
      src: "/music/haywood-new/gentle-tide-morning.mp3",
      section: "On the island",
      note: "Sunrise on the island · F Lydian, 92 BPM · oboe over harp, vibraphone and a warm pad",
    },
    {
      id: "gentle-tide-day",
      title: "Gentle Tide (Day)",
      src: "/music/haywood-new/gentle-tide-day.mp3",
      section: "On the island",
      note: "Daytime · flute over a 3+3+2 marimba riff, guitar, pizzicato bass and light Latin percussion",
    },
    {
      id: "gentle-tide-evening",
      title: "Gentle Tide (Evening)",
      src: "/music/haywood-new/gentle-tide-evening.mp3",
      section: "On the island",
      note: "Sunset · the melody an octave lower on clarinet, with cello, horn and nylon guitar in half time",
    },
  ],
};

const animeTrack = (series: string, id: string, title: string, note: string): LibraryTrack => ({
  id,
  title,
  src: `/music/anime/${id}.mp3`,
  section: `In the style of ${series}`,
  note,
});

const anime: Album = {
  id: "anime-inspired",
  title: "Anime-inspired pieces",
  kind: "Original compositions",
  description:
    "Twelve original pieces written in the style of the soundtracks of four anime series: Bleach, One Piece, Naruto and Dragon Ball. For each one there is a TV-size opening (about 90 seconds, instrumental, with a lead instrument singing the vocal line), a battle theme and an emotional or suspense theme, built from a study of their instrumentation, scales, forms and arranging habits.",
  fineprint:
    "These are original compositions, not covers, arrangements or official soundtracks, and they are not affiliated with or endorsed by the creators or owners of these series. No melody, riff or recognizable passage was borrowed; the series names only point to the style being studied. All trademarks belong to their respective owners.",
  cover: { icon: "note" },
  tracks: [
    animeTrack("Bleach", "shattered-sky", "Shattered Sky",
      "TV-size opening · F♯ minor, 172 BPM · 2000s J-rock: a full-band hit, a sixteenth-note guitar riff, a climbing pre-chorus and a chorus on the VI chord"),
    animeTrack("Bleach", "black-moon-over-the-asphalt", "Black Moon over the Asphalt",
      "Battle · C minor, 96 BPM · a boom-bap beat under the orchestra: piano ostinato, staccato strings, horns and a Phrygian low guitar"),
    animeTrack("Bleach", "rain-over-the-empty-city", "Rain over the Empty City",
      "Emotional · D minor, 74 BPM · intimate piano, a half-time trip-hop beat, clean guitar arpeggios and strings, back to solo piano at the end"),
    animeTrack("One Piece", "toward-the-golden-horizon", "Toward the Golden Horizon",
      "TV-size opening · B♭ major, 150 BPM · pop-rock with a brass section: trumpet fanfare, trombones in thirds, syncopated hits and pounding piano"),
    animeTrack("One Piece", "storm-on-the-deck", "Storm on the Deck",
      "Battle · D minor to D major, 156 BPM · orchestra with a rock band; the horn theme turns major as the fight turns"),
    animeTrack("One Piece", "farewell-at-the-pier", "Farewell at the Pier",
      "Emotional · a 3/4 folk waltz, E♭ to F major, 84 BPM · guitar and harp, flute melody, strings in the bridge and a climactic key change"),
    animeTrack("Naruto", "wind-over-the-rooftops", "Wind over the Rooftops",
      "TV-size opening · E minor, 176 BPM · Japanese rock with shakuhachi, koto and taiko, a two-beat chorus and a taiko-hit ending"),
    animeTrack("Naruto", "blades-in-the-mist", "Blades in the Mist",
      "Battle · D miyako-bushi, 144 BPM · solo taiko, koto in sixteenths, shakuhachi and distorted guitar themes, a ♭II–I cadence"),
    animeTrack("Naruto", "cherry-blossom-ashes", "Cherry Blossom Ashes",
      "Emotional · A minor, 66 BPM · solo koto, a breathy shakuhachi theme, strings and piano, a distant taiko at the climax"),
    animeTrack("Dragon Ball", "blast-on-the-horizon", "Blast on the Horizon",
      "TV-size opening · D major to E♭, 144 BPM · 80s–90s electronic rock: synth brass, synth arpeggios, claps and a half-step lift at the end"),
    animeTrack("Dragon Ball", "clash-on-the-plateau", "Clash on the Plateau",
      "Battle · G minor, 148 BPM · brass up front: parallel fourths, a pentatonic riff doubled by piccolo and xylophone, a climax in B♭ major"),
    animeTrack("Dragon Ball", "before-the-transformation", "Before the Transformation",
      "Suspense · E minor to E major, 84 BPM · a low pedal with heartbeat timpani, chords rising by half steps, then a heroic theme"),
  ],
};

const clientTrack = (id: string, title: string, note: string): LibraryTrack => ({
  id,
  title,
  src: `/music/client-action/${id}.mp3`,
  note,
});

const clientAction: Album = {
  id: "client-action",
  title: "Client work — Action Game Music Pack",
  kind: "Commission",
  description:
    "Seven looping tracks composed and produced for a client's action game: energetic, cartoony and punchy, covering the whole game from the title screen to the boss fight and the credits. Every track loops seamlessly, with the reverb tail of the last bar carried into the first.",
  cover: { icon: "gamepad" },
  tracks: [
    clientTrack("heroes-dash", "Hero's Dash",
      "Main theme · B♭ major, 152 BPM · a brass fanfare, a catchy synth lead, rock band and strings, ending in a stop-time breakdown"),
    clientTrack("turbo-rush", "Turbo Rush",
      "Fast stage · E minor with a G major chorus, 172 BPM · a chiptune lead over a rock band, guitar harmonies and a guitar solo"),
    clientTrack("hot-pursuit", "Hot Pursuit",
      "Chase · D minor lifting to E minor, 168 BPM · non-stop staccato strings, galloping drums, off-beat brass and stop-and-go breaks"),
    clientTrack("big-bad-boss", "Big Bad Boss",
      "Boss fight · F minor, 144 BPM · chugging guitars, double kick, a brass theme in octaves, timpani, gong and a goofy villain march"),
    clientTrack("sneaky-business", "Sneaky Business",
      "Stealth and puzzles · G minor, 132 BPM · tiptoeing pizzicato, staccato clarinet, xylophone and flute, a ticking woodblock and brushes"),
    clientTrack("sky-high", "Sky High",
      "Flying stage · A major, 176 BPM · non-stop arpeggios, a high synth lead, glockenspiel, wind whooshes and a half-time gliding break"),
    clientTrack("victory-lap", "Victory Lap",
      "Victory and credits · E♭ major, 160 BPM · fanfare, a trumpet theme, bouncy bass, a xylophone and chiptune section and an anthem chorus"),
  ],
};

const other: Album = {
  id: "other",
  title: "Other pieces",
  kind: "Original compositions",
  description: "Original music written outside of games, from lo-fi to orchestral, produced in Ableton Live.",
  cover: { image: "/music/covers/late-bus-home.png", alt: "Pixel-art cover: a city at night through a rainy bus window" },
  tracks: [
    {
      id: "late-bus-home",
      title: "Late Bus Home",
      src: "/music/other/late-bus-home.m4a",
      cover: "/music/covers/late-bus-home.png",
      note: "Lo-fi hip hop · the ride home by a foggy window: swung drums, a mellow electric piano on 7th and 9th chords, a muted jazz guitar and a little vinyl crackle",
    },
    {
      id: "beyond-the-ember-peaks",
      title: "Beyond the Ember Peaks",
      src: "/music/other/beyond-the-ember-peaks.mp3",
      cover: "/music/covers/beyond-the-ember-peaks.png",
      note: "Orchestral adventure · an expedition that leaves at night and reaches the summit at dawn; the theme climbs from horns to full orchestra",
    },
    {
      id: "wildfire-resolve",
      title: "Wildfire Resolve",
      src: "/music/other/wildfire-resolve.mp3",
      cover: "/music/covers/wildfire-resolve.png",
      note: "Battle suite · a rock riff, a chorus that keeps climbing in key, a bamboo-flute interlude, a brass fanfare and a fight build-up",
    },
  ],
};

export const ALBUMS: Album[] = [haywoodOriginal, haywoodNew, anime, ...(SHOW_CLIENT_WORK ? [clientAction] : []), other];
