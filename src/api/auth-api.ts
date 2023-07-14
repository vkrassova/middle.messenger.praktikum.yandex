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

  signup(data: SignUpDataType) {
    return this.http.post('/signup', { data: data, method: 'post', timeout: 5000 })
  }
}

export default AuthAPI
