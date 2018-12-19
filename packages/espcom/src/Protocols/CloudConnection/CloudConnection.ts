import mqtt, { MqttClient, Packet } from 'mqtt'
import { Protocol } from '../../Protocol'
import {
  decodeStatusTopic,
  encodeCommandTopic,
  encodeStatusTopic,
} from './utils'

class Req {
  public listeners = new Set<(res: Res) => void>()
  public response?: Res = null

  constructor(
    public fromRef: string | number,
    public id: number,
    public topic: string,
    public data: any
  ) {}

  public serialize() {
    return JSON.stringify([this.fromRef, this.id, this.data])
  }
}

class Res {
  constructor(public id: number, public data: any, public packet: Packet) {}
}

export class CloudConnection implements Partial<Protocol> {
  private listeners = new Set<{
    topic: string
    callback: (data: any, res: Res) => void
  }>()
  private requests = new Array<Req>()
  private client: MqttClient

  constructor(private mqttAddress: string, private deviceId: string) {
    this.connect()

    this.on('ack', (_, res) => {
      const req = this.requests.find(req => req.id === res.id)

      if (req) {
        req.response = res
        req.listeners.forEach(listener => listener(res))
      }
    })
  }

  public async connect() {
    this.disconnect()
    this.client = mqtt.connect(this.mqttAddress)
    this.client.on('message', this.onMessage)
  }

  public async disconnect() {
    if (!this.client) return

    this.client.end()
  }

  public async emit(topic: string, data: any) {
    const req = new Req(this.client.options.clientId, null, topic, data)
    req.id = this.requests.push(req)

    const mqttTopic = encodeCommandTopic(topic, this.deviceId)
    const mqttMessage = req.serialize()

    const res = await new Promise<Res>((resolve, reject) => {
      req.listeners.add(resolve)

      this.client.publish(mqttTopic, mqttMessage, err => err && reject(err))
    })

    return res.data
  }

  public on(topic: string, callback: (data: any, res: Res) => void) {
    const mqttTopic = encodeStatusTopic(
      topic,
      this.deviceId,
      this.client.options.clientId
    )

    const listener = { topic, callback }
    this.listeners.add(listener)

    this.client.subscribe(mqttTopic)

    return () => {
      this.listeners.delete(listener)

      const noMoreSubscriptions = [...this.listeners].find(
        listener => listener.topic === topic
      )

      if (noMoreSubscriptions) this.client.unsubscribe(mqttTopic)
    }
  }

  private onMessage = (mqttTopic: string, payload: Buffer, packet: Packet) => {
    const topic = decodeStatusTopic(
      mqttTopic,
      this.deviceId,
      this.client.options.clientId
    )
    if (!topic) return
    try {
      var [id, data] = JSON.parse(payload.toString())
      if (typeof id !== 'number') throw new Error('Malformed packet')
    } catch (error) {
      console.error('Failed to parse message!', {
        payload,
        error,
        packet,
        string: payload.toString(),
      })
      return
    }

    const res = new Res(id, data, packet)

    this.listeners.forEach(listener => {
      if (listener.topic === topic) {
        listener.callback(data, res)
      }
    })
  }
}
