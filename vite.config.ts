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
  },
  resolve: {
    // Path Aliases
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
      '@global': resolve(__dirname, 'src/global'),
      '@p/root': resolve(__dirname, 'src/pages/root'),
      '@p/workspace': resolve(__dirname, 'src/pages/workspace')
    }
  }
});
