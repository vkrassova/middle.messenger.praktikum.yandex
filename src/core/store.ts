import EventBus from './event-bus'
import Block from './block'
import { set } from '../utils'

class Store extends EventBus {
  private state: State = {}

  getState() {
    return this.state
  }
}

export default Store
