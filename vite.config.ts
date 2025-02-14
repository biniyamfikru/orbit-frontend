import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy': { // Proxy all requests that start with /api
        target: 'https://souqpass.coopbankoromiasc.com/proxy', // Change this to your backend URL
        changeOrigin: true, // Changes the origin of the request to the target URL
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Optional: remove "/api" prefix before sending to the backend
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
