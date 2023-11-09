import store from '../core/store'
import { ChatsAPI } from '../api/chats-api'
import { User } from '../models/user'

class ChatsController {
  private api = new ChatsAPI()

  async create(title: string): Promise<void> {
    try {
      await this.api.create({ title })

      this.fetchChats()
    } catch (e) {
      console.error(e)
    }
  }

  async fetchChats() {
    const chats = await this.api.read()

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id)
    })

    store.set('chats', chats)
  }

  getToken(id: number) {
    return this.api.getToken(id)
  }

  async addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId])
  }

  async deleteUserToChat(id: number, userId: number): Promise<void> {
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
}

export default new ChatsController()
