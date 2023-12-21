import Block from '../../core/block'
import { Message as MessageProps } from '../../models/messages'
import template from './index.tmpl'
import { withSelectedChat } from '../../core/store'
import MessagesController from '../../controllers/messages-controller'
import { Avatar, Input, ControlButton, Button } from '../index'
import { Message } from '../message'
import { ChatInfo } from '../../models/chats'
import { withChats } from '../../core/store'
import ChatsController from '../../controllers/chats-controller'
import { User } from '../../models/user'

interface MessengerProps {
  avatar?: string
  selectedChat: number | undefined
  messages: MessageProps[]
  chats: ChatType[]
  userId: number
  activeChat: ChatInfo | null
}

export type LastMessage = {
  user: User
  time: string
  content: string
  id: number
}

export type ChatType = {
  avatar: null | string
  created_by: number
  id: number
  last_message: LastMessage | null
  title: string
  unread_count: number
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

    const deleteChat = new ControlButton({
      class: 'delete',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          this.deleteChat()
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
      deleteChat: deleteChat,
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

  deleteChat() {
    const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
    if (activeChat !== null && activeChat !== undefined) {
      ChatsController.delete(activeChat?.id)
    }
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    if (!oldProps && !newProps) return false
    this.children.messages = this.createMessages(newProps)

    // const avatar = this.children.avatar as Block
    // avatar.setProps({
    //   ...avatar.props,
    //   avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + this.props.avatar,
    // })

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
        avatarSrc: 'https://ya-praktikum.tech/api/v2/resources' + activeChat.avatar,
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
    return this.compile(template, { ...this.props, activeChat })
  }
}

export const Messenger = withChats(withSelectedChat(MessengerBase))
