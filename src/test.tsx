import { LrcEditor } from "./components/lrc-editor.tsx";
import { useAudioEmbededLyrics } from "./hooks/use-audio-integrated-lyrics.ts";

export function Test() {
  const embededLyrics = useAudioEmbededLyrics();
  console.log(embededLyrics);

  return (
    <LrcEditor>
      <div>
        <label htmlFor="audio-dropzone">
          Drop your audio file here or click to select
        </label>
        <LrcEditor.AudioDropzone id="audio-dropzone" />
      </div>
      <LrcEditor.AudioElement controls />
    </LrcEditor>
  );
}
