import { useRef } from "react";
import { Editor } from "./editor";
import { AddLyricButton } from "./add-lyric-button";
import { enableMapSet } from "immer";

import { AudioElement } from "./audio-element";
import { AudioDropzone } from "./audio-dropzone";
import type { ReactNode, ComponentRef } from "react";
import { AudioContext } from "../context/audio-context";

enableMapSet();

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<ComponentRef<"audio">>(new Audio());

  return (
    <AudioContext.Provider value={audioRef}>{children}</AudioContext.Provider>
  );
}

export function LrcEditor({ children }: LrcEditorProps) {
  return <AudioProvider>{children}</AudioProvider>;
}

LrcEditor.Editor = Editor;
LrcEditor.AudioElement = AudioElement;
LrcEditor.AudioDropzone = AudioDropzone;
LrcEditor.AddLyricButton = AddLyricButton;

export type LrcEditorProps = {
  children?: ReactNode;
};
