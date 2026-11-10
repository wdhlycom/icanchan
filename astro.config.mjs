import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://icanchan.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
