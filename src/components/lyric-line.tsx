import type { ComponentProps, FocusEventHandler } from "react";
import { secondsToTimeInput } from "../utils";
import { IMaskInput } from "react-imask";
import { useEditorStore, usePlayerStore } from "../store";

export function LyricLine({
  id,
  lyricLine = "",
  timestamp = 0,
  ...rest
}: LyricLineProps) {
  const removeLine = useEditorStore((state) => state.removeLyric);
  const updateLine = useEditorStore((state) => state.updateLyric);

  const currentTime = usePlayerStore((state) => state.currentTime);

  const isActive = timestamp <= currentTime && currentTime < timestamp + 5;

  const handleRemove = () => {
    removeLine(id);
  };

  const hanldeLineBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    updateLine(id, value);
  };

  return (
    <div data-active={isActive} id={id} {...rest}>
      <IMaskInput
        mask="00:00.00"
        lazy={false}
        unmask={true}
        overwrite
        defaultValue={secondsToTimeInput(timestamp)}
        placeholder="00:00.00"
      />
      <input type="text" defaultValue={lyricLine} onBlur={hanldeLineBlur} />
      <button onClick={handleRemove}>-</button>
    </div>
  );
}

export type LyricLineProps = ComponentProps<"div"> & {
  id: string;
  lyricLine?: string;
  timestamp?: number;
};
