import API from './api'
import { ChatInfo } from '../models/chats'
import { User } from '../models/user'

export class ChatsAPI extends API {
  constructor() {
    super('/chats')
  }

  create(data: { title: string }) {
    return this.http.post('/', data)
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id })
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get('/')
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id })
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id })
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`)

    return response.token
  }

  public updateAvatar(data: FormData) {
    return this.http.put<ChatInfo>('/avatar', data)
  }

  update = undefined
}
