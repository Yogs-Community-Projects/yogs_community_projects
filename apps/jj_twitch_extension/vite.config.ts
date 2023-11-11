import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { resolve } from 'path'

export default defineConfig(config => {
  return {
    plugins: [solidPlugin()],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          mobile: resolve(__dirname, 'mobile.html'),
          config: resolve(__dirname, 'config.html'),
          analytics: './src/analytics/analytics.js',
        },
      },
    },
  }
})

// https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects/ycapp-f20c0/databases/(default),https://region1.google-analytics.com/
