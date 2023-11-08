import API from './api'
import { SignInData, SignUpData, User } from '../models/user'

export class AuthAPI extends API {
  constructor() {
    super('/auth')
  }

  signin(data: SignInData): Promise<void> {
    return this.http.post('/signin', data)
  }

  signup(data: SignUpData): Promise<void> {
    return this.http.post('/signup', data)
  }

  logout() {
    return this.http.post('/logout')
  }

  read(): Promise<User> {
    return this.http.get('/user')
  }

  create = undefined
  update = undefined
  delete = undefined
}
