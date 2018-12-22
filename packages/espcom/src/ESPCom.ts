import { Protocol } from './Protocol'

type IESPComOptions = {
  protocols: Protocol[]
}

type EmitOptions = {
  strategy: 'fallback' | 'race'
}

export class ESPCom {
  constructor(public protocols: Protocol[]) {
    this.connect()
  }

  public async connect() {
    for (const protocol of this.protocols) {
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

      for (const protocol of this.protocols) {
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
        this.protocols.map(protocol => protocol.emit(topic, payload))
      )
    }
  }
}
