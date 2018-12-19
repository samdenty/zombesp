import mqtt, { MqttClient, Packet } from 'mqtt'
import { Protocol } from '../../Protocol'
import {
  decodeStatusTopic,
  encodeCommandTopic,
  encodeStatusTopic,
} from './utils'

export class CloudConnection implements Partial<Protocol> {
  static sharedClient = new Map<
    string,
    { connections: number; client: MqttClient }
  >()

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
    if (!CloudConnection.sharedClient.has(this.mqttAddress)) {
      const client = mqtt.connect(this.mqttAddress)

      CloudConnection.sharedClient.set(this.mqttAddress, {
        connections: 0,
        client,
      })
    }

    const sharedClient = CloudConnection.sharedClient.get(this.mqttAddress)

    this.client = sharedClient.client
    this.client.on('message', this.onMessage)
    sharedClient.connections++
  }

  public async disconnect() {
    if (!this.client) return

    this.client.off('message', this.onMessage)

    const sharedClient = CloudConnection.sharedClient.get(this.mqttAddress)
    if (sharedClient) {
      sharedClient.connections--

      if (sharedClient.connections === 0) {
        this.client.end()
        CloudConnection.sharedClient.delete(this.mqttAddress)
      }
    }
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
