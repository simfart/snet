import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: '/snet/',
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      pages: path.resolve(__dirname, './src/pages'),
      shared: path.resolve(__dirname, './src/shared'),
      features: path.resolve(__dirname, './src/features'),
      entities: path.resolve(__dirname, './src/entities'),
      widgets: path.resolve(__dirname, './src/widgets'),
    },
  },
});
