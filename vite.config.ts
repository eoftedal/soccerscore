import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sharp from 'sharp';

const imagePath = fileURLToPath(new URL('./src/assets/soccer.webp', import.meta.url));

const versions = [16, 120, 152, 180];
const favIconPlugin = () => {
  return {
    name: 'favIconPlugin',
    async transformIndexHtml(html: string) {
      const links = [];
      for (const v of versions) {
        const resized = await sharp(imagePath).resize({ width: v, height: v }).toBuffer();
        const base64 = resized.toString('base64');
        links.push(
          `<link rel="${
            v == 16 ? 'icon' : 'apple-touch-icon'
          }" type="image/webp" sizes="${v}x${v}" href="data:image/webp;base64,${base64}">`
        );
      }

      return html.replace('<link rel="icon">', links.join('\n'));
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), favIconPlugin()],
  base: '/soccerscore',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
