import Block from '../../core/block'
import template from './index.templ'

class NavigationPage extends Block {
  constructor() {
    super('div', {})
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default NavigationPage
