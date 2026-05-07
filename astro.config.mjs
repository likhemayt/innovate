// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://innovate-proto.vercel.app', // <--- This is the M-1 fix

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],
  image: {
    domains: ['images.unsplash.com'],
  }
});
