import { observable, autorun, reaction } from 'mobx'

type Response = any

export class BaseLink {
  private disposers: Function[]

  constructor() {
    this.disposers = [
      autorun(() => {
        if (this.connected) this.lastConnected = +new Date()
      }),
    ]
  }

  @observable public connected: boolean = false
  @observable public lastConnected: number = null

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
