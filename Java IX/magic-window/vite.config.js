import { defineConfig } from 'vite'

export default defineConfig({
  root: './magic-window',
  server: {
    port: 3003,
    open: true,
    https: true // AR requires HTTPS
  },
  build: {
    outDir: '../dist/magic-window'
  }
})