import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" ? componentTagger() : null,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // Ensure assets load correctly
  build: {
    outDir: "dist", // Explicitly set the output directory for Vercel
    sourcemap: mode === "development", // Enable sourcemaps in development for debugging
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    "process.env.VERCEL_ANALYTICS_ID": JSON.stringify(process.env.VERCEL_ANALYTICS_ID || ""),
  },
}));
