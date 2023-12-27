import Block from '../../core/block'
import template from './index.tmpl'
import Button from '../button'
import Input from '../input'
import ChatsController from '../../controllers/chats-controller'
import { CreateChatType } from '../../api/chats-api'

export class ChatModal extends Block {
  init() {
    const input = new Input({
      isActive: false,
      name: 'title',
      type: 'text',
      placeholder: 'Введите название чата',
      events: {
        change: (evt) => {
          this.getValue(evt, this)
        },
      },
    })

    const button = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Добавить',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          this.onSubmit()
        },
      },
    })

    this.children = {
      input: input,
      button: button,
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

  async onSubmit() {
    await ChatsController.create(this.state.title as CreateChatType).finally(() => {
      const popup = document?.querySelector('.modal__chat')
      popup?.classList.remove('active')
      const input = this.children.input as Input
      input.setProps({ ...input.props, value: '' })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
