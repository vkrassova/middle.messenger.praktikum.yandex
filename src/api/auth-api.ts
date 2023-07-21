import API from './api'

export interface SignUpDataType {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type UserType = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type SignInDataType = {
  login: string
  password: string
}

export class AuthAPI extends API {
  constructor() {
    super('/auth')
  }

  signin(data: SignInDataType): Promise<void> {
    return this.http.post('/signin', { data: data, method: 'post', timeout: 5000 })
  }

  signup(data: SignUpDataType): Promise<void> {
    return this.http.post('/signup', { data: data, method: 'post', timeout: 5000 })
  }

  logout() {
    return this.http.post('/logout', { method: 'post', timeout: 5000 })
  }

  getUser(): Promise<UserType> {
    return this.http.get('/user')
  }
}

export default AuthAPI
