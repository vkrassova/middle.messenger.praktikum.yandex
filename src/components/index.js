import Handlebars from 'handlebars/runtime'

import button from './button/button'
import { input } from './input/input'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)

export { button, input }
