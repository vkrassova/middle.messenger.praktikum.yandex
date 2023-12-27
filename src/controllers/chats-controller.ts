import store from '../core/store'
import { ChatsAPI } from '../api/chats-api'
import { User } from '../models/user'
import MessagesController from './messages-controller'
import { ChatInfo } from '../models/chats'

interface Props {
  title: string
}

class ChatsController {
  private api = new ChatsAPI()

  async create(title: Props): Promise<void> {
    try {
      await this.api.create(title)

      this.fetchChats()
    } catch (e) {
      console.error(e)
    }
  }

  async fetchChats() {
    const chats = await this.api.read()

    chats?.map(async (chat) => {
      const token = await this.getToken(chat.id)

      await MessagesController.connect(chat.id, token)
    })

    store.set('chats', chats)
  }

  getToken(id: number) {
    return this.api.getToken(id)
  }

  async addUserToChat(id: number, userId: number): Promise<void> {
    this.api.addUsers(id, [userId])
  }

  async deleteUserFromChat(id: number, userId: number): Promise<void> {
    this.api.deleteUsers(id, [userId])
  }

  async delete(id: number) {
    await this.api.delete(id)

    this.fetchChats()
  }

  async getChatUsers(id: number): Promise<User[]> {
    const users = await this.api.getUsers(id)

    return users
  }

  selectChat(id: number) {
    store.set('selectedChat', id)
  }

  async getFiltredChats(filter: string) {
    try {
      let chats: ChatInfo[] = []
      chats = (await this.api.getFilter(`?title=${filter}`)) as ChatInfo[]
      store.set('chats', chats)
      store.set('currentChat', 0)
      chats.map(async (chat) => {
        const token = await this.getToken(chat.id)
        await MessagesController.connect(chat.id, token)
      })
    } catch (e: unknown) {
      console.error(e)
    }
  }

  public async updateAvatar(data: File, chatId: ChatInfo['id']): Promise<ChatInfo['avatar'] | null> {
    try {
      const formData = new FormData()
      formData.append('avatar', data)
      formData.append('chatId', chatId.toString())
      await this.api.updateAvatar(formData)
    } catch (e) {
      console.error(e)
    }

    return null
  }
}

export default new ChatsController()
