import Block from '../../core/block'
import template from './index.templ'

export class HomePage extends Block {
  constructor() {
    super({})
  }

  render() {
    return this.compile(template, this.props)
  }
}
