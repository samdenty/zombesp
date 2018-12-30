import { observable } from 'mobx'

type Response = any

export class BaseLink {
  @observable connected: boolean = false
}

export interface Link extends BaseLink {
  emit(topic: string, payload: any): Promise<Response>
  on(topic: string, callback: (data: any, res?: any) => void): () => void

  connect(): Promise<void>
  disconnect(): void
}
