import Block from '../../core/block'
import template from './index.tmpl'

type Props = { [key: string]: unknown }

interface inputProps extends Props {
  name?: string
  type?: string
  value?: string | unknown
  events?: Record<string, (e: InputEvent) => void>
  placeholder?: string
  class?: string
  modificator?: string
  isActive?: boolean
  labelText?: string
}

class Input extends Block {
  constructor(props: inputProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Input
