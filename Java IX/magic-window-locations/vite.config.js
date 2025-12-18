import { defineConfig } from 'vite'

export default defineConfig({
  root: './magic-window-locations',
  server: {
    port: 3004,
    open: true,
    https: true // AR requires HTTPS
  },
  build: {
    outDir: '../dist/magic-window-locations'
  }
})