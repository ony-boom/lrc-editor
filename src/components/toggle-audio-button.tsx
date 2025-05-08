import type { ComponentProps } from "react";
import { useAudioRef } from "../context/audio-context";

export function ToggleAudioButton(props: ToggleAudioButtonProps) {
  const audioRef = useAudioRef();

  const handeClick = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <button onClick={handeClick} {...props}>
      {props.children ?? "Play/Pause"}
    </button>
  );
}

export type ToggleAudioButtonProps = ComponentProps<"button">;
