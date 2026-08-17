import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://1-1dole.github.io',
  base: '/Personal-Website',
  output: 'static',
  integrations: [tailwind()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (asset) => asset.names.some((name) => name.endsWith('.css'))
            ? '_astro/site[extname]'
            : '_astro/[name].[hash][extname]',
        },
      },
    },
  },
});
