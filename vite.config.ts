import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  // resolve: {
  // 	dedupe: ['@fullcalendar/common']
  // },
  // optimizeDeps: {
  // 	include: ['@fullcalendar/common']
  // }
  server: {
    port: 8000,
    strictPort: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   }
    // },
  }
});
