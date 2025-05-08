import type { ChangeEventHandler, ComponentProps } from "react";
import { usePlayerStore } from "../store";

export function AudioDropzone(props: AudioDropzoneProps) {
  const setAudioSrc = usePlayerStore((state) => state.setAudioSrc);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioSrc(file);
    }
    props.onChange?.(event);
  };

  return (
    <input {...props} onChange={handleChange} type="file" accept="audio/*" />
  );
}

export type AudioDropzoneProps = Omit<
  ComponentProps<"input">,
  "type" | "accept"
>;
