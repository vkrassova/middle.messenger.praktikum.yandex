import { EventBus } from './event-bus'
import Block from './block'
import { User } from '../models/user'
import { ChatInfo } from '../models/chats'
import { set } from '../utils'
import { Message } from '../models/messages'

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user: User
  chats: ChatInfo[]
  messages: Record<number, Message[]>
  selectedChat?: number
}

export class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState(): State {
    return this.state
  }
}

const store = new Store()

// @ts-ignore
window.store = store

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends Record<string, any>>(Component: typeof Block<P & SP>) {
    return class WithStore extends Component {
      private onStoreUpdate: () => void

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())

        super({ ...(props as P), ...previousState })

        this.onStoreUpdate = () => {
          const stateProps = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...this.props, ...stateProps })
        }

        store.on(StoreEvents.Updated, this.onStoreUpdate)
      }

      componentWillUnmount() {
        store.off(StoreEvents.Updated, this.onStoreUpdate)
      }
    }
  }
}

export const withUser = withStore((state) => ({ ...state.user }))
export const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }))
export const withSelectedChat = withStore((state) => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  }
})
// export const withSelectedChat = withStore((state) => ({
//   selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
// }))
// export const withSelectedChat = withStore((state) => ({ selectedChat: state.selectedChat }))

export default store
