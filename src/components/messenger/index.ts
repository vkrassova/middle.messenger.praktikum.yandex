import Block from '../../core/block'
import { Message as MessageProps } from '../../models/messages'
import Button from '../button'
import template from './index.tmpl'
import { withSelectedChat } from '../../core/store'
import MessagesController from '../../controllers/messages-controller'
import { Avatar, Input } from '../index'
import { Message } from '../message'
import { ChatInfo } from '../../models/chats'
import { withChats } from '../../core/store'
import ChatsController from '../../controllers/chats-controller'
import { withUser } from '../../core/store'

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

  async updateAvatar(file: File, activeChatId: number) {
    try {
      await ChatsController.updateAvatar(file, activeChatId)
    } catch (e) {
      console.log(e)
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
    const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)

    if (activeChat !== null && activeChat !== undefined) {
      this.children.avatar = new Avatar({
        isNotActive: false,
        avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + activeChat?.avatar,
        events: {
          change: async (event) => {
            const target = event.target as HTMLInputElement
            const files = target?.files

            if (files !== null) {
              this.updateAvatar(files[0], activeChat.id)
            }
          },
        },
      })
    }
    return this.compile(template, this.props)
  }
}

export const Messenger = withChats(withUser(withSelectedChat(MessengerBase)))
