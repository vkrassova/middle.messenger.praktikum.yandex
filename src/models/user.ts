export interface SignUpData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id?: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  password?: string
  avatar?: string
}

export interface SignInData {
  login: string
  password: string
}

export interface PasswordUpdate {
  oldPassword: string
  newPassword: string
}
