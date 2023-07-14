import Block from '../core/block'
import router from '../core/router'

export interface PropsWithRouter {
  router: typeof router
}

export function withRouter(Component: typeof Block) {
  return class WithRouter extends Component {
    constructor(props: PropsWithRouter | any) {
      super({ ...props, router: router })
    }
  }
}
