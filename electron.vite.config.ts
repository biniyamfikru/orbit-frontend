import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {},
    preload: {},
    renderer: {
        plugins: [react()],
        server: {
            proxy: {
                '/proxy': {
                    target: 'https://souqpass.coopbankoromiasc.com',
                    changeOrigin: true,
                    secure: false,
                    // Optionally rewrite the path
                    // rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
});