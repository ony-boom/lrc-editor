import { LrcEditor } from "./components/lrc-editor.tsx";

export function Test() {
  return (
    <LrcEditor>
      <div>
        <label htmlFor="audio-dropzone">
          Drop your audio file here or click to select
        </label>
        <LrcEditor.AudioDropzone id="audio-dropzone" />
      </div>

      <div>
        <LrcEditor.AudioElement controls />

        <LrcEditor.AudioElement.SeekButton direction="backward" />
        <LrcEditor.AudioElement.SeekButton direction="forward" />
      </div>

      <LrcEditor.Editor
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
        }}
      >
        <LrcEditor.AddLyricButton />
      </LrcEditor.Editor>
    </LrcEditor>
  );
}
