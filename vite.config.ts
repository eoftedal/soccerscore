import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      defaultDirectives() {
        return new URLSearchParams({
          format: 'webp',
          w: '180',
          h: '180'
        });
      }
    })
  ],
  base: '/soccerscore',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
