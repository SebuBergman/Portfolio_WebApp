import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pagecomponents": "/src/pageComponents",
      "@hooks": "/src/components/hooks",
    },
  },
});
