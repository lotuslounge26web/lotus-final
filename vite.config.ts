import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Provide a browser‑compatible stub for Node's `url` module used by
      // the `source-map` package. This prevents Vite from externalizing it.
      url: path.resolve(__dirname, 'src/shims/url.ts'),
    },
  },
  // Existing Vite configurations (if any) should remain unchanged.
});