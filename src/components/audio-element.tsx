import { useEditorStore } from "../store";
import { useMemo, type ComponentProps } from "react";
import { useAudioRef } from "../context/audio-context";

export function AudioElement(props: AudioElementProps) {
  const audioRef = useAudioRef();
  const fileSrc = useEditorStore((state) => state.audioSrc);

  const src = useMemo(
    () => (fileSrc ? URL.createObjectURL(fileSrc) : undefined),
    [fileSrc],
  );

  return <audio {...props} ref={audioRef} src={src} />;
}

export type AudioElementProps = Omit<ComponentProps<"audio">, "src">;
