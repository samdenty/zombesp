type Response = any

export interface Protocol {
  emit(topic: string, payload: any): Promise<Response>
  on(topic: string, callback: (data: any, res?: any) => void): () => void

  connect(): Promise<void>
  disconnect(): Promise<void>
}
