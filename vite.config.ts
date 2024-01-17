import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        workspace: resolve(__dirname, 'workspace/index.html')
      }
    }
  }
});
