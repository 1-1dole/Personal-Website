import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://1-1dole.github.io',
  base: '/Personal-Website',
  output: 'static',
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
