import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from './vite-plagin-handlebars-precompile'

export default defineConfig({
  plugins: [handlebars()],
})
