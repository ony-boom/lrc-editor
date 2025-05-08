import type { ComponentProps } from "react";
import { useAudioRef } from "../context/audio-context";

const SEEK_TIME = 2; // seconds

export function SeekAudioButton({ direction, ...props }: SeekAudioButtonProps) {
  const audioRef = useAudioRef();

  const handeClick = () => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const seekTime =
      direction === "forward"
        ? currentTime + SEEK_TIME
        : currentTime - SEEK_TIME;
    audioRef.current.currentTime = Math.max(0, Math.min(seekTime, duration));
  };

  return (
    <button onClick={handeClick} {...props}>
      {(props.children ?? direction === "forward") ? ">>" : "<<"}
    </button>
  );
}

export type SeekAudioButtonProps = ComponentProps<"button"> & {
  direction: "forward" | "backward";
};
