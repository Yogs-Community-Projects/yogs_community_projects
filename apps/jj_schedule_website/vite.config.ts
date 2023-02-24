import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    // splitVendorChunkPlugin(),
    // VitePWA(pwaOptions()),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
