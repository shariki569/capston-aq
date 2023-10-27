import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.jsx",
    },
  },
  server: {
    proxy: {
      "/api/": process.env.REACT_APP_BACKEND_URL,
    },
  },
  plugins: [react()],
});
