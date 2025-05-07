import type { ReactNode, ComponentRef } from "react";
import { AudioDropzone } from "./audio-dropzone";
import { AudioElement } from "./audio-element";
import { AudioContext } from "../context/audio-context.ts";

import { useRef } from "react";

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<ComponentRef<"audio">>(new Audio());

  return (
    <AudioContext.Provider value={audioRef}>{children}</AudioContext.Provider>
  );
}

export function LrcEditor({ children }: LrcEditorProps) {
  return <AudioProvider>{children}</AudioProvider>;
}

LrcEditor.AudioDropzone = AudioDropzone;
LrcEditor.AudioElement = AudioElement;

export type LrcEditorProps = {
  children?: ReactNode;
};
