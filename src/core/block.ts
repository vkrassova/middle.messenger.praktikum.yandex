/* eslint-disable */

import { EventBus } from './event-bus.ts'
import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'

export enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const
  public children: Record<string, Block<any> | Block<any>[]>
  public id = nanoid(6)
  public props: P
  private eventBus: () => EventBus
  private _element: HTMLElement | null = null
  public state: { [key: string]: unknown }

  public constructor(propsWithChildren: P) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this.children = children
    this.props = this._makePropsProxy(props)
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
    this.state = {}
  }

  public removeEvents(): void {
    this._removeEvents()
    Object.keys(this.children).forEach((child) => {
      if (Array.isArray(this.children[child])) {
        ;(this.children[child] as Block<P>[]).forEach((ch) => ch.removeEvents())
      } else {
        ;(this.children[child] as Block<P>).removeEvents()
      }
    })
  }

  private _getChildrenAndProps(childrenAndProps: P): { props: P; children: Record<string, Block<P> | Block<P>[]> } {
    const props: Record<string, unknown> = {}
    const children: Record<string, Block<P> | Block<P>[]> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) ||
        value instanceof Block
      ) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children }
  }

  private _addEvents(): void {
    const { events } = this.props

    if (events != null) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName])
      })
    }
  }

  private _removeEvents(): void {
    const { events } = this.props

    if (events != null) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName])
      })
    }
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _init(): void {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount()
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    if (oldProps !== newProps) return true
    return true
  }

  public setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  public getProps = (key: string): any => {
    const value = this.props[key]

    return value
  }

  public get element(): HTMLElement | null {
    return this._element
  }

  private _render(): void {
    const fragment = this.render()
    const newElement = fragment?.firstElementChild

    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement as HTMLElement

    this._addEvents()
  }

  public compile(template: string, context: any): DocumentFragment {
    const contextAndDummies = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndDummies[name] = component.map((child) => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndDummies[name] = `<div data-id="${component.id}"></div>`
      }
    })
    const html = Handlebars.compile(template)(contextAndDummies)

    const temp = document.createElement('template')
    temp.innerHTML = html

    const replaceSkeleton = (component: any) => {
      const dummy = temp.content.querySelector(`[data-id="${component.id}"]`)
      if (dummy == null) {
        return
      }

      component.getContent()?.append(...Array.from(dummy.childNodes))
      dummy.replaceWith(component.getContent())
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((comp) => replaceSkeleton(comp))
      } else {
        replaceSkeleton(component)
      }
    })

    return temp.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  public getContent(): HTMLElement | null {
    return this.element
  }

  private _makePropsProxy(props: P) {
    const self = this

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]

        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)

        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }
}

export default Block
