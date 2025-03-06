import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  root: 'src',
  publicDir: '../public'
})
