import Block from '../../core/block'
import template from './index.tmpl'
import Button from '../button'
import Input from '../input'

export class ChatModal extends Block {

  init() {
    const input = new Input({
      isActive: false,
      name: 'title',
      type: 'text',
      events: {
        change: (evt) => {
          this.getValue(evt, this)
        },
      },
    })

    this.children = {
      input: input,
    }
  }

  componentDidMount() {
    this.state = {
      title: '',
    }
  }

  getValue(event: Event, self: Block) {
    const target = event.target as HTMLInputElement
    self.state[target.name] = target?.value
  }

  render() {
    return this.compile(template, this.props)
  }
}
