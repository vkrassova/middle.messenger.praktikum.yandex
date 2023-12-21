import Block from '../../core/block'
import template from './index.tmpl'
import { Button, Input } from '../index'
import ChatsController from '../../controllers/chats-controller'
import { ChatInfo } from '../../models/chats'

interface modalProps {
  type?: string
  title?: string
}

export class Modal extends Block {
  constructor(props: modalProps) {
    super(props)
  }

  init() {
    const input = new Input({
      isActive: false,
      name: 'title',
      type: 'text',
      placeholder: this.props.type,
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
    const data = {
      title: this.state.title as string,
    }

    // const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)

    console.log(this.props)
    // await ChatsController.create(this.state.title as string).finally(() => {
    //   const popup = document?.querySelector('.modal__chat')
    //   popup?.classList.remove('active')
    //   const input = this.children.input as Input
    //   input.setProps({ ...input.props, value: '' })
    // })
  }

  render() {
    return this.compile(template, this.props)
  }
}
