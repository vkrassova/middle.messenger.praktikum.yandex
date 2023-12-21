import store from '../core/store'
import { ChatsAPI } from '../api/chats-api'
import { User } from '../models/user'
import MessagesController from './messages-controller'
import { ChatInfo } from '../models/chats'

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

      await MessagesController.connect(chat.id, token)
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

  public async updateAvatar(data: File, chatId: ChatInfo['id']): Promise<ChatInfo['avatar'] | null> {
    try {
      const formData = new FormData()
      formData.append('avatar', data)
      formData.append('chatId', chatId.toString())
      const chat = await this.api.updateAvatar(formData)

      const { chats } = store.getState()

      const updatedChats = chats.map((currentChat) => {
        if (currentChat.id === chat.id) {
          return chat
        }

        return currentChat
      })

      // store.set('chats', updatedChats)

      return chat.avatar
    } catch (e) {
      console.error(e)
    }

    return null
  }
}

export default new ChatsController()
