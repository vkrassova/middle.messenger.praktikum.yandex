import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from './vite-plagin-handlebars-precompile'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/pages/login/login.html'),
      },
    },
  },
  plugins: [handlebars()],
})
