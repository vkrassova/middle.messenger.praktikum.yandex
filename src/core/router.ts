import Block from './block'
import { render } from './render-DOM'

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs
}

class Route {
  private _block: Block | null
  private readonly _pathname: string
  private _props: Record<string, string>
  private readonly _blockClass: Block

  constructor(pathname: string, view: Block, props: Record<string, string>) {
    this._pathname = pathname
    this._props = props
    this._blockClass = view
    this._block = null
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._block?.show()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass
      render(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }
}

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private currentRoute: Route | null = null
  private history = window.history
  private _rootQuery!: string

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this._rootQuery = rootQuery

    Router.__instance = this
  }

  public use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router('#app')
