import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from "react";

export type Track = { title: string; file: string; artist?: string };

type MusicState = {
  tracks: Track[];
  index: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
};

const initialState: MusicState = {
  tracks: [],
  index: 0,
  playing: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  error: null,
};

type MusicContextValue = {
  state: MusicState;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  play(): void;
  pause(): void;
  toggle(): void;
  seek(t: number): void;
  setVolume(v: number): void;
  prev(): void;
  next(): void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MusicState>(initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("music/playlist.json");
      const data = await res.json();
      const tracks: Track[] = data.tracks || [];
      setState((s) => ({ ...s, tracks, index: 0, playing: false, currentTime: 0, duration: 0, error: null }));
    } catch {
      setState((s) => ({ ...s, tracks: [], error: "加载歌单失败" }));
    }
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    setState((s) => {
      if (s.playing) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play().catch(() => {});
      }
      return s;
    });
  }, []);

  const seek = useCallback((t: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(t, audio.duration || 0));
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = v;
    setState((s) => ({ ...s, volume: v }));
  }, []);

  const prev = useCallback(() => {
    setState((s) => {
      if (s.tracks.length === 0) return s;
      const idx = s.index > 0 ? s.index - 1 : s.tracks.length - 1;
      return { ...s, index: idx, playing: true, currentTime: 0 };
    });
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      if (s.tracks.length === 0) return s;
      const idx = s.index < s.tracks.length - 1 ? s.index + 1 : 0;
      return { ...s, index: idx, playing: true, currentTime: 0 };
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setState((s) => ({ ...s, currentTime: audio.currentTime, duration: audio.duration || 0 }));
    const onPlay = () => setState((s) => ({ ...s, playing: true }));
    const onPause = () => setState((s) => ({ ...s, playing: false }));
    const onEnded = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [next]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = state.tracks[state.index];
    if (!track) return;
    audio.src = track.file;
    audio.volume = state.volume;
    if (state.playing) audio.play().catch(() => {});
  }, [state.index, state.tracks, state.playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = state.volume;
  }, [state.volume]);

  const value: MusicContextValue = {
    state,
    audioRef,
    play,
    pause,
    toggle,
    seek,
    setVolume,
    prev,
    next,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
