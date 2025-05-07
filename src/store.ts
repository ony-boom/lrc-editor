import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";

export type Lyrics = Map<string, number[]>;

export type EditorStore = {
  audioSrc: File | null;
  lyrics: Lyrics;

  setAudioSrc: (file: File | null) => void;
  addLyric: (lyric: string, time: number) => void;
  removeLyric: (lyric: string) => void;
  updateLyric: (lyric: string, times: number[]) => void;
  clearLyrics: () => void;
};

export const useEditorStore = create<EditorStore>()(
  immer((set) => ({
    audioSrc: null,
    lyrics: new Map(),

    setAudioSrc: (file) => {
      set((state) => {
        state.audioSrc = file;
      });
    },

    addLyric: (lyric, time) => {
      set((state) => {
        const current = (state.lyrics.get(lyric) ?? []) as number[];
        if (!current.includes(time)) {
          current.push(time);
          current.sort((a, b) => a - b);
          state.lyrics.set(lyric, current);
        }
      });
    },

    removeLyric: (lyric) => {
      set((state) => {
        state.lyrics.delete(lyric);
      });
    },

    updateLyric: (lyric, times) => {
      set((state) => {
        if (Array.isArray(times) && times.length > 0) {
          state.lyrics.set(
            lyric,
            [...times].sort((a, b) => a - b),
          );
        }
      });
    },

    clearLyrics: () => {
      set((state) => {
        state.lyrics.clear();
      });
    },
  })),
);
