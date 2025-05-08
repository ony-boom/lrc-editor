import { useEffect, useState } from "react";
import * as mm from "music-metadata";
import { usePlayerStore } from "../store";

export function useAudioMetadata() {
  const audioFileSrc = usePlayerStore((state) => state.audioSrc);
  const [metadata, setMetadata] = useState<mm.IAudioMetadata["common"] | null>(
    null,
  );

  useEffect(() => {
    if (!audioFileSrc) return;

    const fetchMetadata = async () => {
      try {
        const { common } = await mm.parseBlob(audioFileSrc);
        setMetadata(common);
      } catch (error) {
        console.error("Failed to parse audio metadata:", error);
        setMetadata(null);
      }
    };

    fetchMetadata();
  }, [audioFileSrc]);

  return metadata;
}
