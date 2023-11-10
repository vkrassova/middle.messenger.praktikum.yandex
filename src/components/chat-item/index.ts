import { ChatInfo } from '../../models/chats'
import { Block } from '../../core/block'
import store from '../../core/store'
import { withSelectedChat } from '../../core/store'
import Button from '../button'
import template from './index.tmpl'

interface ChatProps {
  id: number
  title: string
  unread_count: number
  selectedChat: ChatInfo
  events: {
    click: () => void
  }
}

class ChatItemBaseComponent extends Block {
  constructor(props: ChatProps) {
    super(props)
  }

  init() {
    const todayDate = new Date().toLocaleDateString()
    const messageDate = new Date(this.props.last_message.time).toLocaleDateString()
    if (todayDate === messageDate) {
      this.props.time = new Date(this.props.last_message.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else {
      this.props.time = messageDate
    }
    this.props.content = this.props.last_message.content.slice(0, 30) + '...'
  }

  render() {
    // const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
    return this.compile(template, this.props)
  }
}

export const ChatsItem = withSelectedChat(ChatItemBaseComponent)
