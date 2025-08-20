import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '',
  server: { host: '127.0.0.1', port: 5174, strictPort: false },
  preview:{ host: '127.0.0.1', port: 4174, strictPort: false },
})
