import { observable, autorun, computed } from 'mobx'
import { persist } from 'mobx-persist'
import { now } from 'mobx-utils'

type Response = any

const MAX_MS_UNTIL_OFFLINE = 5 * 1000

export class BaseLink {
  private disposers: Function[]

  @observable public connected: boolean = false

  @persist
  @observable
  public lastConnected: number = null

  @persist
  @observable
  public lastOnline: number = null

  @observable public startOnline: number = null

  @computed
  public get online() {
    if (!this.connected || !this.lastOnline) return false
    const msSinceLastOnline = now() - this.lastOnline

    return msSinceLastOnline < MAX_MS_UNTIL_OFFLINE
  }

  @computed
  public get connectionDuration() {
    if (!this.connected) return null

    return now() - this.lastConnected
  }

  @computed
  public get onlineDuration() {
    if (!this.online) return null

    return now() - this.startOnline
  }

  constructor() {
    this.disposers = [
      autorun(() => {
        if (this.connected) this.lastConnected = +new Date()
      }),
      autorun(() => {
        this.startOnline = this.online ? +new Date() : null
      }),
    ]
  }

  public dispose() {
    this.disposers.forEach(dispose => dispose)
  }
}

export interface Link extends BaseLink {
  emit(topic: string, payload: any): Promise<Response>
  on(topic: string, callback: (data: any, res?: any) => void): () => void

  connect(): Promise<void>
  disconnect(): void
}
