import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import electron from "vite-plugin-electron";
import fs from "node:fs";
import { join } from "node:path";

/**
 * Remove the dist-electron folder before building
 */
const removeElectronDist = () => {
  const DIST_PATH = join(__dirname, "dist-electron");
  console.log(`Removing ${DIST_PATH} before building...`);
  fs.rmSync(DIST_PATH, { recursive: true, force: true });
};

// https://vitejs.dev/config/
export default defineConfig(() => {
  removeElectronDist();

  return {
    plugins: [
      react(),
      electron({
        entry: "electron/main.ts",
        onstart(options) {
          options.startup();
        },
      }),
    ],
  };
});
