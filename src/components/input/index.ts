import Block from '../../core/block'
import template from './index.tmpl'

type Props = { [key: string]: unknown }

interface inputProps extends Props {
  name: string
  type?: string
  events: Record<string, (e: InputEvent) => void>
  placeholder: string
  modificator: string
}

class Input extends Block {
  constructor(props: inputProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Input
