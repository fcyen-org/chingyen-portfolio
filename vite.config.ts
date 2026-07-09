import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(
  readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
);

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    // Never inline assets as base64 into the bundle. The default 4kB limit
    // sweeps up ~125 small @fontsource woff2 subsets (Gugi's Korean ranges,
    // Latin-ext, etc.) into the CSS, forcing every visitor to download all
    // of them up front and defeating unicode-range lazy loading.
    assetsInlineLimit: 0,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
