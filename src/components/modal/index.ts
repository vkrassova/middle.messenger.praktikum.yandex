import Block from '../../core/block'
import template from './index.tmpl'
import { Button, Input } from '../index'
import ChatsController from '../../controllers/chats-controller'
import { ChatInfo } from '../../models/chats'

interface modalProps {
  class?: string
  type?: string
  title?: string
  addUser?: boolean
  deleteUser?: boolean
  user?: boolean
  onClickAddUser?: (value?: number) => Promise<void>
  getValue?: (evt?: Event) => void
  onClickDeletedUser?: (value?: number) => Promise<void>
  events?: {
    click: () => void | Promise<void>
  }
}

export class Modal extends Block {
  constructor(props: modalProps) {
    super(props)
  }

  init() {
    const input = new Input({
      isActive: false,
      name: this.props.user ? 'login' : 'title',
      type: 'text',
      placeholder: this.props.type,
      events: {
        change: (evt) => {
          this.props.getValue(evt)
        },
      },
    })

    const button = new Button({
      class: 'button--fill',
      title: 'Добавить',
      events: {
        click: async (evt: Event) => {
          evt.preventDefault()
          this.props.addUser ? await this.props.onClickAddUser() : this.props.onClickDeletedUser()
        },
      },
    })

    this.children = {
      input: input,
      button: button,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
