"use client";

import { useCallback, useRef, useState } from "react";
import { Music, Pause, Play, Volume2 } from "lucide-react";

/** Replace with your own file in /public/music.mp3 or keep the demo URL. */
const DEFAULT_SRC =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export function BackgroundAudio({ src = DEFAULT_SRC }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    if (!started) {
      setStarted(true);
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }
    if (el.paused) {
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [started]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <Volume2 className="h-4 w-4 text-slate-500" aria-hidden />
        Background music
      </div>
      <p className="text-sm text-slate-500">
        Browsers block autoplay with sound. Press play once to start—after that
        you can pause or resume anytime.
      </p>
      <div className="flex items-center gap-3">
        <audio ref={audioRef} src={src} loop preload="none" className="hidden" />
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          {playing ? (
            <>
              <Pause className="h-4 w-4" aria-hidden />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" aria-hidden />
              {started ? "Play" : "Play music"}
            </>
          )}
        </button>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Music className="h-3.5 w-3.5" aria-hidden />
          Ambient playback
        </span>
      </div>
    </div>
  );
}
