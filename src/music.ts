export type Track = {
  id: string;
  title: string;
  group: string;
  seconds: number;
  note: string;
};

export const trackSrc = (track: Track) => `/music/${track.id}.m4a`;

/** Original music written for Haywood Valley, played on orchestral woodwinds in Ableton Live. */
export const TRACKS: Track[] = [
  { id: "theme-morning", title: "Theme · Morning", group: "Main theme by time of day", seconds: 49, note: "Flute, open and bright" },
  { id: "theme-afternoon", title: "Theme · Afternoon", group: "Main theme by time of day", seconds: 48, note: "Clarinet" },
  { id: "theme-dusk", title: "Theme · Dusk", group: "Main theme by time of day", seconds: 48.5, note: "English horn" },
  { id: "theme-night", title: "Theme · Night", group: "Main theme by time of day", seconds: 49, note: "Alto flute, darker color" },
  { id: "theme-overture", title: "Theme · Overture", group: "Main theme by time of day", seconds: 48.5, note: "The full woodwind section" },
  { id: "arpeggios-day", title: "Arpeggios · Day", group: "Woodwind arpeggios", seconds: 70.1, note: "Two chords rocking back and forth" },
  { id: "arpeggios-night", title: "Arpeggios · Night", group: "Woodwind arpeggios", seconds: 66.9, note: "Alto flute in sixteenths" },
  { id: "arpeggios-waltz", title: "Arpeggios · Waltz", group: "Woodwind arpeggios", seconds: 37.3, note: "Three against two" },
  { id: "jingle-level-up", title: "Level up", group: "Jingles", seconds: 6, note: "A rising B-flat arpeggio" },
  { id: "jingle-rare-item", title: "Rare item", group: "Jingles", seconds: 6.1, note: "A Lydian run to a magic chord" },
  { id: "jingle-sleep", title: "Sleep and save", group: "Jingles", seconds: 6.6, note: "The theme's motif as a lullaby" },
];

/** What the background music plays, in order, looping. */
export const BACKGROUND_PLAYLIST = ["theme-morning", "arpeggios-day", "theme-afternoon", "arpeggios-waltz", "theme-dusk", "theme-night", "arpeggios-night"]
  .map((id) => TRACKS.find((t) => t.id === id)!)
  .filter(Boolean);

export const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
