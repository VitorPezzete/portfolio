import { useEffect, useRef, useState } from "react";
import { BACKGROUND_MUSIC_PLAY_EVENT, BACKGROUND_PLAYLIST, trackSrc } from "../music";

const VOLUME = 0.35;

/**
 * Background music toggle for the status bar. Browsers only allow sound after a click, so it starts
 * off and the button is that click. Any other audio on the page that starts playing pauses it, and
 * starting it tells the Music section's player to pause (BACKGROUND_MUSIC_PLAY_EVENT).
 */
const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = VOLUME;
    audioRef.current = audio;
    const next = () => setIndex((i) => (i + 1) % BACKGROUND_PLAYLIST.length);
    audio.addEventListener("ended", next);
    const pauseForOthers = (e: Event) => {
      if (e.target !== audio && e.target instanceof HTMLMediaElement) {
        audio.pause();
        setOn(false);
      }
    };
    document.addEventListener("play", pauseForOthers, true);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", next);
      document.removeEventListener("play", pauseForOthers, true);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!on) {
      audio.pause();
      return;
    }
    const src = trackSrc(BACKGROUND_PLAYLIST[index]);
    if (!audio.src.endsWith(src)) audio.src = src;
    document.dispatchEvent(new Event(BACKGROUND_MUSIC_PLAY_EVENT));
    audio.play().catch(() => setOn(false));
  }, [on, index]);

  const toggle = () => setOn((v) => !v);

  const playing = BACKGROUND_PLAYLIST[index];
  return (
    <button
      type="button"
      className="ase-statusbar-item"
      onClick={toggle}
      title={on ? `Playing: ${playing.title}` : "Play the Haywood Valley soundtrack"}
      aria-pressed={on}
      style={{ cursor: "pointer", background: "none", border: "none", color: "inherit", font: "inherit" }}
    >
      {on ? `♪ ${playing.title}` : "♪ Music: off"}
    </button>
  );
};

export default BackgroundMusic;
