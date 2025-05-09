import type { ComponentProps, MouseEventHandler } from "react";
import { useEditorStore, usePlayerStore } from "../store";

export function AddLyricButton({
  children = "Add lyric",
  ...rest
}: AddLyricButtonProps) {
  const { getState } = usePlayerStore;
  const addLyric = useEditorStore((state) => state.addLyric);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { currentTime } = getState();
    addLyric(currentTime, "Tap to change line");

    rest?.onClick?.(event);
  };

  return (
    <button {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}

export type AddLyricButtonProps = ComponentProps<"button"> & {
  children?: React.ReactNode;
};
