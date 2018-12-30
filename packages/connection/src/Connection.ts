import { Link } from './Link'

type EmitOptions = {
  strategy: 'fallback' | 'race'
}

export class Connection {
  public links = new Set<Link>()

  constructor() {
    this.connect()
  }

  public async isConnected() {
    return false
  }

  public async connect() {
    for (const protocol of this.links) {
      // try {
      protocol.connect()
      // }
    }
  }

  public async emit(
    topic: string,
    payload: any,
    { strategy = 'fallback' }: EmitOptions = {} as any
  ) {
    if (strategy === 'fallback') {
      let lastError: Error

      for (const protocol of this.links) {
        try {
          return await protocol.emit(topic, payload)
        } catch (e) {
          lastError = e
          continue
        }
      }
      throw lastError
    }

    if (strategy === 'race') {
      return await Promise.race(
        Array.from(this.links).map(protocol => protocol.emit(topic, payload))
      )
    }
  }
}
