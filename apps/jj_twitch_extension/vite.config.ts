import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import federation from '@originjs/vite-plugin-federation'

const fedProd = federation({
  name: 'app',
  remotes: {
    remoteApp: 'https://jinglejam.yogs.app/assets/remoteEntry.js',
  },
  shared: ['solid-js', '@ycapp/model', '@ycapp/common'],
})

const fedDev = federation({
  name: 'app',
  remotes: {
    remoteApp: 'http://127.0.0.1:5001/assets/remoteEntry.js',
  },
  shared: ['solid-js', '@ycapp/model', '@ycapp/common'],
})

export default defineConfig(config => {
  console.log(config)
  let fed = fedDev
  if (config.mode === 'production') {
    fed = fedProd
  }
  return {
    plugins: [solidPlugin()],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
    },
  }
})
