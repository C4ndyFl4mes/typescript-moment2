import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry
        template: 'src/pages/template.html', // Additional pages
      },
    },
  },
});