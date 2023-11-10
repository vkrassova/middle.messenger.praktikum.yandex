import Block from '../../core/block'
import { Message as MessageProps } from '../../models/messages'
import Button from '../button'
import template from './index.tmpl'
import { withSelectedChat } from '../../core/store'
import MessagesController from '../../controllers/messages-controller'
import Input from '../input'
import { Message } from '../message'

interface MessengerProps {
  selectedChat: number | undefined
  messages: MessageProps[]
  userId: number
}

class MessengerBase extends Block {
  constructor(props: MessengerProps) {
    super(props)
  }

  componentDidMount() {
    this.state = {
      message: '',
    }
  }

  init() {
    const button = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Отправить',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          const input = this.children.input as Input
          this.onSubmit().finally(() => {
            input.setProps({ ...input.props, value: '' })
          })
        },
      },
    })

    const message = this.createMessages(this.props)

    const input = new Input({
      isActive: false,
      name: 'message',
      type: 'text',
      events: {
        change: (evt) => {
          this.getValue(evt, this)
        },
      },
    })

    this.children = {
      button: button,
      messages: message,
      input: input,
    }
  }

  getValue(event: Event, self: Block) {
    const target = event.target as HTMLInputElement
    self.state[target.name] = target?.value
  }

  async onSubmit() {
    const message = this.state.message as string
    if (message !== '' && message !== undefined) {
      MessagesController.sendMessage(this.props.selectedChat, message)
    }
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps)

    return true
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const Messenger = withSelectedChat(MessengerBase)
