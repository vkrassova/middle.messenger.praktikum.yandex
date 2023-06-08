import Handlebars from 'handlebars/runtime'

import tmpl from './button/button'

Handlebars.registerPartial('button', tmpl)

export { tmpl }
