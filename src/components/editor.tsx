import { useEditorStore } from "../store";
import { LyricLine } from "./lyric-line";
import { type ComponentProps } from "react";

export function Editor(props: EditorProps) {
  const lyrics = useEditorStore((state) => state.lyrics);

  return (
    <div {...props}>
      {lyrics.map(({ id, timestamp, line }) => {
        return (
          <LyricLine id={id} key={id} lyricLine={line} timestamp={timestamp} />
        );
      })}

      {props.children}
    </div>
  );
}

export type EditorProps = ComponentProps<"div">;
