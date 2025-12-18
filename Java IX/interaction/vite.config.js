import { defineConfig } from 'vite'

export default defineConfig({
  root: './interaction',
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: '../dist/interaction'
  }
})