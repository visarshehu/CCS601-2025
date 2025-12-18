import { defineConfig } from 'vite'

export default defineConfig({
  root: './hello-world',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist/hello-world'
  }
})