import Block from '../../core/block'
import template from './index.templ'
import { ChatsList } from '../../components/chats-list'
import ChatsController from '../../controllers/chats-controller'
import { withChats } from '../../core/store'
import { Messenger } from '../../components/messenger'

export class HomePageBasis extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.chats = new ChatsList({ isLoaded: false })
    this.children.chatsWindow = new Messenger({})

    ChatsController.fetchChats().finally(() => {
      const chats = this.children.chats as Block
      chats.setProps({
        isLoaded: true,
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const HomePage = withChats(HomePageBasis)
