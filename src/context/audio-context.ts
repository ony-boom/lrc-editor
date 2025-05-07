import { useContext } from "react";
import { createContext, type ComponentRef, type RefObject } from "react";

export const AudioContext = createContext<RefObject<
  ComponentRef<"audio">
> | null>(null);

export function useAudioRef() {
  const context = useContext(AudioContext);
  if (!context)
    throw new Error("useAudioRef must be used within an AudioProvider");
  return context;
}
