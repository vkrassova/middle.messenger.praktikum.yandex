import Block from '../../core/block'
import template from './index.templ'

// type Props = { [key: string]: unknown }

class HomePage extends Block {
  constructor() {
    super('div', {})
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default HomePage
