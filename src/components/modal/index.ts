import Block from '../../core/block'
import template from './index.tmpl'
import { Button, Input } from '../index'

interface modalProps {
  class?: string
  type?: string
  title?: string
  addUser?: boolean
  deleteUser?: boolean
  user?: boolean
  onClickAddUser?: (value?: number) => Promise<void>
  getValue?: (evt?: Event) => void
  closePopup?: (evt?: Event) => void
  onClickDeletedUser?: (value?: number) => Promise<void>
  events?: {
    click: () => void | Promise<void>
  }
}

export default class Modal extends Block {
  constructor(props: modalProps) {
    super(props)
  }

  init() {
    const input = new Input({
      isActive: false,
      name: this.props.user ? 'login' : 'title',
      type: 'text',
      placeholder: this.props.user ? 'Логин' : 'Название чата',
      events: {
        change: (evt) => {
          this.props.getValue(evt)
        },
      },
    })

    const close = new Button({
      class: 'close-button',
      events: {
        click: async (evt: Event) => {
          evt.preventDefault()
          const input = this.children.input as Input
          input.setProps({ ...input.props, value: '' })
          this.props.closePopup()
        },
      },
    })

    const button = new Button({
      class: 'button--fill',
      title: 'Отправить',
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
      close: close,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
