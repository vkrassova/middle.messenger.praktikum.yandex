import Block from '../../core/block'
import template from './index.templ'
import { ChatsList } from '../../components/chats-list'
import ChatsController from '../../controllers/chats-controller'
import { withChats } from '../../core/store'

export class HomePageBasis extends Block {
  constructor() {
    super({})
    ChatsController.fetchChats()
  }

  init() {
    this.children.chats = new ChatsList({})
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const HomePage = withChats(HomePageBasis)
