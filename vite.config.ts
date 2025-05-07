import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        hooks: resolve(__dirname, "src/hooks/index.ts"),
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "zustand", "music-metadata"],
      output: {
        globals: {
          react: "React",
          zustand: "zustand",
          "react-dom": "ReactDOM",
          "music-metadata": "music-metadata",
        },
      },
    },
  },
});
