import { Link } from './Link'
import { computed } from 'mobx'

type EmitOptions = {
  strategy: 'fallback' | 'race'
}

export class Connection {
  public links = new Set<Link>()

  constructor() {}

  @computed
  public get connected() {
    for (const link of this.links) {
      if (link.connected) return true
    }
    return false
  }

  @computed
  public get online() {
    for (const link of this.links) {
      if (link.online) return true
    }
    return false
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
