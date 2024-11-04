import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  base: '/info474-react-parcel-template',
  plugins: [
    react({
    jsxRuntime: 'automatic'
    }),
    // analyzer() // uncomment this line to see bundle analysis
  ],
  build: {
    outDir: 'build',
    // uncomment to view generated chunks
    // rollupOptions: {
    //   output:{
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  }
})