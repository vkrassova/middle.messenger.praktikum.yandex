import Block from './block.ts'
import { render } from './render-DOM.ts'
import { Routes } from '../utils/constants.ts'
import { isEqual } from '../utils/index.ts'

class Route {
  private block: Block | null = null

  constructor(private pathname: string, private readonly blockClass: typeof Block, private readonly query: string) {}

  leave() {
    this.block = null
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname)
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({})

      render(this.query, this.block)
      return
    }
  }
}

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private currentRoute: Route | null = null
  private history = window.history

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery)
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

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname)

    if (this.currentRoute != null) {
      this.currentRoute.leave()
    }
    if (route != null) {
      this.currentRoute = route
      route.render()
    } else {
      this.go(Routes.Error)
    }
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
