import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/info474-react-parcel-template',
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  build: {
    outDir: 'build'
  }
})