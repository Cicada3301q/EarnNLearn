import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  console.log(`Vite is running in ${mode} mode`);
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "",
    define: {
      "process.env": env,
    },
    plugins: [react()],
    server: {
      // open: true,
      port: 3000,
    },
    build: {
      minify: false,
    },
  };
});
