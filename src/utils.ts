import type { Lyrics } from "./store";

const TIMESTAME_REGEX = /\[(\d{2}):(\d{2}\.\d{2})\]/g;
const INFO_REGEX = /^\[(ti|ar|al|by|length|offset):.*\]$/i;

const parseLyricLine = (line: string) => {
  const timestamps = [...line.matchAll(TIMESTAME_REGEX)].map((match) => {
    const [, minutes, seconds] = match;
    return (Number(minutes) * 60 + Number(seconds)) * 1000;
  });

  const text = line.replace(TIMESTAME_REGEX, "").trim();

  return { text, timestamps };
};

const isInfoLine = (line: string) => {
  return INFO_REGEX.test(line);
};

export function toLyricObject(text: string): Lyrics {
  const lyrics = new Map<string, number[]>();

  for (const line of text.split("\n")) {
    if (isInfoLine(line)) continue;

    const { timestamps, text: lyric } = parseLyricLine(line);
    if (!lyric || timestamps.length === 0) continue;

    const timestampSet = new Set(lyrics.get(lyric) ?? []);

    for (const ts of timestamps) {
      timestampSet.add(ts);
    }

    lyrics.set(
      lyric,
      [...timestampSet].sort((a, b) => a - b),
    );
  }

  return lyrics;
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
