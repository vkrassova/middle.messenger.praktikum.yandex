import { JSDOM } from 'jsdom'

const { window } = new JSDOM('<div id="app" class="app"></div>', {
  url: 'http://localhost:3000',
})

global.window = window
global.document = window.document
global.DocumentFragment = window.DocumentFragment
global.history = window.history
