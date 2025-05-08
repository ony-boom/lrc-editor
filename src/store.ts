import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";

export type LyricLine = {
  id: string;
  timestamp: number;
  line: string;
};

export type EditorStore = {
  lyrics: LyricLine[];

  addLyric: (timestamp: number, line: string) => void;
  removeLyric: (id: string) => void;
  updateLyric: (id: string, newLine: string, newTimestamp?: number) => void;
  clearLyrics: () => void;
};

export type PlayerStore = {
  audioSrc: File | null;
  duration: number;
  position: number;
  currentTime: number;
  setAudioSrc: (file: File | null) => void;
};

export const useEditorStore = create<EditorStore>()(
  immer((set) => ({
    lyrics: [],

    addLyric: (timestamp, line) => {
      const id = nanoid();
      set((state) => {
        state.lyrics.push({ id, timestamp, line });
        state.lyrics.sort((a, b) => a.timestamp - b.timestamp);
      });
    },

    removeLyric: (id) => {
      set((state) => {
        state.lyrics = state.lyrics.filter((lyric) => lyric.id !== id);
      });
    },

    updateLyric: (id, newLine, newTimestamp) => {
      set((state) => {
        const lyric = state.lyrics.find((l) => l.id === id);
        if (lyric) {
          lyric.line = newLine;
          if (newTimestamp !== undefined) {
            lyric.timestamp = newTimestamp;
          }
          state.lyrics.sort((a, b) => a.timestamp - b.timestamp);
        }
      });
    },

    clearLyrics: () => {
      set((state) => {
        state.lyrics = [];
      });
    },
  })),
);

export const usePlayerStore = create<PlayerStore>()((set) => ({
  duration: 0,
  position: 0,
  audioSrc: null,
  currentTime: 0,

  setAudioSrc: (file) => set({ audioSrc: file }),
}));
