import EventBus from './event-bus'
import Block from './block'
import { User } from '../api/auth-api'
import { set } from '../utils'

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key in string]: T
}

export interface State {
  user?: User
  selectedChat?: number
}

class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

// @ts-ignore
window.store = store

export function withStore<SP>(mapStateToProps: (state: State) => Indexed) {
  return function wrap<P>(Component: typeof Block) {
    return class WithStore extends Component {
      private onStoreUpdate: () => void

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())

        super({ ...props, ...previousState })

        this.onStoreUpdate = () => {
          const stateProps = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...stateProps })

          console.log(stateProps)
        }

        store.on(StoreEvents.Updated, this.onStoreUpdate)
      }

      componentWillUnmount() {
        console.log('Store off')
        store.off(StoreEvents.Updated, this.onStoreUpdate)
      }
    }
  }
}

export default store
