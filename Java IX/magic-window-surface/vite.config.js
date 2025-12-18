import { defineConfig } from 'vite'

export default defineConfig({
  root: './magic-window-surface',
  server: {
    port: 3005,
    open: true,
    https: true // AR requires HTTPS
  },
  build: {
    outDir: '../dist/magic-window-surface'
  }
})