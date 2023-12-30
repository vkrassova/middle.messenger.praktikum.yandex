import { Message } from '../models/messages'
import store from '../core/store'
import WSTransport, { WSTransportEvents } from '../core/WSTransport'

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map()

  public async connect(id: number, token: string): Promise<void> {
    if (this.sockets.has(id)) {
      return
    }

    const userId = store.getState().user?.id

    if (userId == null) {
      return
    }

    const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`)

    this.sockets.set(id, wsTransport)

    await wsTransport.connect()

    this.subscribe(wsTransport, id)
    this.fetchOldMessages(id)
  }

  public sendMessage(id: number, message: string): void {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({
      type: 'message',
      content: message,
    })
  }

  public fetchOldMessages(id: number, content = 0): void {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({ type: 'get old', content: `${content}` })
  }

  public closeAll(): void {
    Array.from(this.sockets.values()).forEach((socket) => socket.close())
  }

  private onMessage(id: number, messages: Message | Message[]): void {
    let messagesToAdd: Message[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse()
    } else {
      messagesToAdd.push(messages)
    }

    const currentMessages = (store.getState().messages || {})[id] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]

    store.set(`messages.${id}`, messagesToAdd)
  }

  private onClose(id: number): void {
    this.sockets.delete(id)
  }

  private subscribe(transport: WSTransport, id: number): void {
    transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message))
    transport.on(WSTransportEvents.Close, () => this.onClose(id))
  }
}

export default new MessagesController()
