import { User } from './user'

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: User
    time: string
    content: string
  }
}
