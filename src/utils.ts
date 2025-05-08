import { nanoid } from "nanoid";
import type { LyricLine } from "./store";

const TIMESTAME_REGEX = /\[(\d{2}):(\d{2}\.\d{2})\]/g;
const INFO_REGEX = /^\[(ti|ar|al|by|length|offset):.*\]$/i;

export function secondsToTimeInput(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const secs = (seconds % 60).toFixed(2).padStart(5, "0"); // ensures "00.00" format

  return `${mins}:${secs}`;
}

const parseLyricLine = (line: string) => {
  const timestamps = [...line.matchAll(TIMESTAME_REGEX)].map((match) => {
    const [, minutes, seconds] = match;
    return (Number(minutes) * 60 + Number(seconds)) * 1000;
  });

  const text = line.replace(TIMESTAME_REGEX, "").trim();

  return { text, timestamps };
};

export function timeInputToSeconds(input: string): number {
  const match = input.match(/^(\d{2}):(\d{2})\.(\d{2})$/);
  if (!match) return 0;

  const [, mm, ss, xx] = match;
  const minutes = parseInt(mm, 10);
  const seconds = parseInt(ss, 10);
  const hundredths = parseInt(xx, 10);

  return minutes * 60 + seconds + hundredths / 100;
}

const isInfoLine = (line: string) => {
  return INFO_REGEX.test(line);
};

export function toLyricObject(text: string): LyricLine[] {
  const lyrics: LyricLine[] = [];

  for (const line of text.split("\n")) {
    if (isInfoLine(line)) continue;

    const { timestamps, text: lyric } = parseLyricLine(line);
    if (!lyric || timestamps.length === 0) continue;

    for (const timestamp of timestamps) {
      lyrics.push({
        id: nanoid(),
        timestamp,
        line: lyric,
      });
    }
  }

  return lyrics.sort((a, b) => a.timestamp - b.timestamp);
}
/* export function toLyricString(
  lyrics: Lyrics,
  metadata: {
    title: string;
    artist: string;
    length: number;
    author?: string;
    lyricist?: string;
    album?: string;
    by?: string;
    comment?: string;
  },
): string {} */
