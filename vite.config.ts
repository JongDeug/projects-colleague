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
    // port: 8000,
    // strictPort: true,
    proxy: {
      // "/api": {
      //   target: "https://98a7-222-103-180-169.ngrok-free.app",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // }
      '/api': 'https://98a7-222-103-180-169.ngrok-free.app',
    },
  }
});
