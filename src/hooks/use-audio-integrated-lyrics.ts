import { toLyricObject } from "../utils";
import { useAudioMetadata } from "./use-audio-metadata";

export function useAudioEmbededLyrics() {
  const metadata = useAudioMetadata();

  if (!metadata) {
    return null;
  }

  const lyrics = metadata.lyrics?.at(0)?.text ?? null;

  if (!lyrics) {
    return null;
  }

  return toLyricObject(lyrics);
}
