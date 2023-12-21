import { Block } from '../../core/block'
import template from './index.tmpl'
import { ChatInfo } from '../../models/chats'
import { withChats } from '../../core/store'
import { ChatsItem } from '../chat-item'
import ChatsController from '../../controllers/chats-controller'
import store from '../../core/store'
import { StoreEvents } from '../../core/store'

interface ChatsListProps {
  chats: ChatInfo[]
  isLoaded: boolean
}

class ChatListBase extends Block {
  constructor(props: ChatsListProps) {
    super(props)
  }

  protected async componentDidMount(): Promise<void> {
    super.componentDidMount()

    await ChatsController.fetchChats()
  }

  init() {
    if (this.props.chats) {
      this.children.chatItems = this.createChats(this.props)
    }
  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    if (!oldProps && !newProps) return false
    this.children.chatItems = this.createChats(newProps)

    return true
  }

  createChats(props: ChatsListProps) {
    return props.chats?.map((data) => {
      return new ChatsItem({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
          },
        },
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ChatsList = withChats(ChatListBase)
