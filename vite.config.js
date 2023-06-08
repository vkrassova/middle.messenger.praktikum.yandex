import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from './vite-plagin-handlebars-precompile'

export default defineConfig({
  // root: resolve(__dirname, '/'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [handlebars()],
})
