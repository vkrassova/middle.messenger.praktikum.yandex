import API from './api'
import { User, PasswordUpdate } from '../models/user'

export class UserAPI extends API {
  constructor() {
    super('/user')
  }

  update(data: User): Promise<User> {
    return this.http.put('/profile', data)
  }

  updatePassword(data: PasswordUpdate): Promise<User> {
    return this.http.put('/password', data)
  }

  updateAvatar(data: File): Promise<User> {
    return this.http.put('/profile/avatar', data)
  }

  searchUser(data: { login: string }): Promise<User[]> {
    return this.http.post('/search', data)
  }

  read = undefined

  create = undefined

  delete = undefined
}
