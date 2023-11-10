import { EventBus } from './event-bus'

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

const DEFAULT_PINT_TIME_MS = 5000

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null

  private pingInterval: NodeJS.Timer | number = 0

  constructor(private url: string) {
    super()
  }

  public send(data: unknown): void {
    if (!this.socket) {
      throw new Error('Socket is not connected')
    }

    this.socket.send(JSON.stringify(data))
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url)

    this.subscribe(this.socket)

    this.setupPing()

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve()
      })
    })
  }

  public close(): void {
    this.socket?.close()
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, DEFAULT_PINT_TIME_MS)

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval as number)

      this.pingInterval = 0
    })
  }

  private subscribe(socket: WebSocket): void {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected)
    })
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close)
    })

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e)
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)

        if (data.type != null && data.type === 'pong') {
          return
        }

        this.emit(WSTransportEvents.Message, data)
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message)
        }
      }
    })
  }
}
