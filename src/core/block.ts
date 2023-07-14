import EventBus from './event-bus'
import Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid'

export enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type Props = { [key: string]: unknown }

type MetaProps = {
  props: Props
}

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  private _element: HTMLElement | null = null
  protected children: Record<string, Block>
  private _meta: MetaProps
  protected props: Props
  public state: { [key: string]: unknown }
  private eventBus: () => EventBus

  public id: string = makeUUID()

  constructor(propsAndChildren: Props) {
    const { children, props } = this._getChildren(propsAndChildren)

    this.children = children

    const eventBus = new EventBus()

    this._meta = {
      props,
    }

    this.props = this._makePropsProxy({ ...props, id: this.id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    this.state = {}

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildren(propsAndChildren: Props) {
    const children = {} as typeof this.children
    const props = {} as Props

    Object.entries(propsAndChildren).forEach(([key, value]): void => {
      if (value instanceof Block) {
        children[key as string] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  protected compile(template: string, props: Props) {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const content = fragment.content
      const stub = content.querySelector(`[data-id="${child.id}"]`)

      const el = child.getContent()

      if (!stub) {
        return
      }

      if (el) {
        stub.replaceWith(el)
      }
    })

    return fragment.content
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const tagName = 'div'
    this._element = this._createDocumentElement(tagName)
  }

  public init() {
    this._createResources()

    this.dispatchComponentDidMount()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount(): void {
    this.componentDidMount()
  }

  public componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    const { eventBus } = this
    eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(EVENTS.FLOW_RENDER)
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps !== newProps
  }

  public setProps(nextProps: Props): void {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement | null {
    return this._element
  }

  private _render() {
    const block = this.render()

    this._removeEvents()

    if (this._element) {
      this._element.innerHTML = ''
      this._element.appendChild(block)
    }

    this._addEvents()
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  public render(): DocumentFragment {
    return this.compile('', {})
  }

  public getContent(): HTMLElement | null {
    return this.element
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, p: string, value) => {
        const oldValue = target[p]

        if (oldValue !== value) {
          target[p as keyof Props] = value
          this.eventBus().emit(EVENTS.FLOW_CDU)
        }

        return true
      },
      deleteProperty: () => {
        throw new Error('нет доступа')
      },
    })
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this.id || '')

    return element
  }

  private _addEvents(): void {
    const { events = {} } = this.props

    if (events) {
      Object.entries(events as Record<string, () => void>).forEach(([eventName, callback]) => {
        this._element?.addEventListener(eventName, callback)
      })
    }
  }

  private _removeEvents(): void {
    const { events = {} } = this.props

    if (events) {
      Object.entries(events as Record<string, () => void>).forEach(([eventName, callback]) => {
        this._element?.removeEventListener(eventName, callback)
      })
    }
  }

  public show(): void {
    if (this._element) this._element.style.display = 'block'
  }

  public hide(): void {
    if (this._element) this._element.style.display = 'none'
  }
}

export default Block
