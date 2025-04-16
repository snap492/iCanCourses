import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
    base: './', // 💡 важно для WebView2: делает все пути в HTML относительными
    plugins: [plugin(), tailwindcss(),],
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    }
})
