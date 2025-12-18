import { defineConfig } from 'vite'

export default defineConfig({
  root: './import-assets',
  server: {
    port: 3002,
    open: true
  },
  build: {
    outDir: '../dist/import-assets'
  },
  assetsInclude: ['**/*.gltf', '**/*.glb']
})