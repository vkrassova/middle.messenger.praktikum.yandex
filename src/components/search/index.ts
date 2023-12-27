import Block from '../../core/block'
import template from './index.tmpl'
import { Input } from '../../components/index'

interface searchProps {
  getValue?: (evt?: Event) => void
  events?: Record<string, (e: InputEvent) => void>
}

export default class Modal extends Block {
  constructor(props: searchProps) {
    super(props)
  }

  init() {
    const input = new Input({
      isActive: false,
      class: 'search-input',
      placeholder: 'Поиск чата',
      name: 'search',
      events: {
        change: (evt) => {
          this.props.getValue(evt)
        },
      },
    })

    this.children = {
      input: input,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
