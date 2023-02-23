import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
    }),
    solidPlugin(),
    solidSvg({
      defaultAsComponent: true,
    }),
    // viteObfuscateFile({}),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
