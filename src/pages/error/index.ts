import { Block } from '../../core/block'
import template from './index.tmpl'

export class ErrorPage extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
