import { Protocol } from '../Protocol'

export class DirectConnection implements Protocol {
  private listeners = new Set<{
    topic: string
    callback: (data: any, res: Res) => void
  }>()
  private buffer = new Set<any>()

  private responses = new Array<Res>()
  private requests = new Array<Req>()

  public websocket: WebSocket

  constructor(private websocketAddress: string) {
    this.connect()

    this.on('ack', (_, res) => {
      const req = this.requests.find(req => req.id === res.id)

      if (req) {
        req.response = res
        req.listeners.forEach(listener => listener(res))
      }
    })
  }

  public connect() {
    this.websocket = new WebSocket(this.websocketAddress)

    return new Promise<any>(resolve => {
      this.websocket.onmessage = this.onMessage

      this.websocket.onopen = () => {
        this.buffer.forEach(payload => this.websocket.send(payload))
        this.buffer.clear()
        resolve()
      }
      this.websocket.onclose = () => {
        this.connect()
      }
    })
  }

  public async disconnect() {
    if (!this.websocket) return

    this.websocket.onopen = null
    this.websocket.onclose = null
    this.websocket.onmessage = null
    this.websocket.close()
  }

  public async emit(topic: string, data: any) {
    const req = new Req(null, topic, data)
    req.id = this.requests.push(req)

    const payload = req.serialize()

    if (this.websocket.readyState === this.websocket.OPEN) {
      this.websocket.send(payload)
    } else {
      this.buffer.add(payload)
    }

    const res = await new Promise<Res>(resolve => req.listeners.add(resolve))

    return res.data
  }

  public on(topic: string, callback: (data: any, res: Res) => void) {
    const listener = { topic, callback }
    this.listeners.add(listener)

    return () => this.listeners.delete(listener)
  }

  private onMessage = (message: MessageEvent) => {
    try {
      var [topic, id, data] = JSON.parse(message.data)

      if (typeof topic !== 'string' || typeof id !== 'number')
        throw new Error('Malformed packet')
    } catch (error) {
      console.error('Failed to parse message!', { error, message })
      return
    }

    const res = new Res(id, data)
    this.responses.push(res)

    this.listeners.forEach(listener => {
      if (topic === listener.topic) listener.callback(data, res)
    })
  }
}

class Res {
  constructor(public id: number, public data: any) {}
}

class Req {
  public listeners = new Set<(res: Res) => void>()
  public response?: Res = null

  constructor(public id: number, public topic: string, public data: any) {}

  public serialize() {
    return JSON.stringify([this.topic, this.id, this.data])
  }
}
