import { usePlayerStore } from "../store";
import { useMemo, type ChangeEventHandler, type ComponentProps } from "react";
import { useAudioRef } from "../context/audio-context";
import { ToggleAudioButton } from "./toggle-audio-button";
import { SeekAudioButton } from "./seek-audio-button";

export function AudioElement(props: AudioElementProps) {
  const audioRef = useAudioRef();
  const { setState: setPlayerState } = usePlayerStore;
  const fileSrc = usePlayerStore((state) => state.audioSrc);

  const src = useMemo(
    () => (fileSrc ? URL.createObjectURL(fileSrc) : undefined),
    [fileSrc],
  );

  const handleLoadedMetadata: ChangeEventHandler<HTMLAudioElement> = (
    event,
  ) => {
    const element = event.currentTarget as HTMLAudioElement;
    setPlayerState({ duration: element.duration });
  };

  const handleTimeUpdate: ChangeEventHandler<HTMLAudioElement> = (event) => {
    const element = event.currentTarget as HTMLAudioElement;
    setPlayerState({ currentTime: element.currentTime });
  };

  return (
    <audio
      {...props}
      src={src}
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
    />
  );
}

AudioElement.SeekButton = SeekAudioButton;
AudioElement.ToggleButton = ToggleAudioButton;

export type AudioElementProps = Omit<ComponentProps<"audio">, "src">;
