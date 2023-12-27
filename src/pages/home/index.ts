import Block from '../../core/block'
import template from './index.templ'
import { ChatsList } from '../../components/chats-list'
import ChatsController from '../../controllers/chats-controller'
import { withChats } from '../../core/store'
import { Messenger } from '../../components/messenger'
import { Button, Search } from '../../components'
import { ChatModal } from '../../components/add-chat'
import { withSelectedChat } from '../../core/store'

export class HomePageBasis extends Block {
  constructor() {
    super({})
  }

  componentDidMount() {
    this.state = {
      search: '',
    }
  }

  init() {
    const chats = new ChatsList({ isLoaded: false })
    const chatsWindow = new Messenger({})
    const chatModal = new ChatModal({})
    const search = new Search({
      getValue: (evt) => {
        const target = evt?.target as HTMLInputElement
        this.state[target.name] = target?.value
      },
      events: {
        submit: async (event: Event) => {
          event.preventDefault()
          this.onSubmit()
        },
      },
    })

    const addChat = new Button({
      class: 'button--fill',
      type: 'button',
      title: 'Добавить чат',
      modificator: 'button--add-chats',
      events: {
        click: () => {
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
      search: search,
    }
  }

  async onSubmit() {
    await ChatsController.getFiltredChats(this.state.search as string)
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
