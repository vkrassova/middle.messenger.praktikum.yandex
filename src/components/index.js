import Handlebars from 'handlebars/runtime'

import button from './button/button'
import input from './input/input'
import mainTitle from './main-title/main-title'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('main-title', mainTitle)

export { button, input, mainTitle }
