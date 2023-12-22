import Block from '../../core/block'
import template from './index.templ'
import { ChatsList } from '../../components/chats-list'
import ChatsController from '../../controllers/chats-controller'
import { withChats } from '../../core/store'
import { Messenger } from '../../components/messenger'
import { Button, ControlButton } from '../../components'
import { ChatModal } from '../../components/add-chat'
import { ChatInfo } from '../../models/chats'
import { withSelectedChat } from '../../core/store'

export class HomePageBasis extends Block {
  constructor() {
    super({})
  }

  init() {
    const chats = new ChatsList({ isLoaded: false })
    const chatsWindow = new Messenger({})
    const chatModal = new ChatModal({})

    const addChat = new Button({
      class: 'button--fill',
      type: 'button',
      title: 'Добавить чат',
      events: {
        click: () => {
          console.log(this.props)
          this.addChat()
        },
      },
    })

    ChatsController.fetchChats().finally(() => {
      const chats = this.children.chats as Block
      chats.setProps({
        isLoaded: true,
      })
    })

    this.children = {
      chats: chats,
      chatsWindow: chatsWindow,
      addChat: addChat,
      chatModal: chatModal,
    }
  }

  addChat() {
    const popup = document?.querySelector('.modal__chat')

    popup?.classList.add('active')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const HomePage = withSelectedChat(withChats(HomePageBasis))
