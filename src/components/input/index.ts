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
    super(props)
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }

  public getName() {
    return (this.element as HTMLInputElement).name
  }

  public getValue() {
    return (this.element as HTMLInputElement).value
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Input
