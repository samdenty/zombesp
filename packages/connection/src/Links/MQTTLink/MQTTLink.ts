import { connect, MqttClient, Packet } from 'mqtt'
import { Link, BaseLink } from '../../Link'
import {
  createClientId,
  decodeStatusTopic,
  encodeCommandTopic,
  encodeStatusTopic,
} from './utils'

export class MQTTLink extends BaseLink implements Link {
  static sharedClient = new Map<
    string,
    { connections: number; client: MqttClient }
  >()

  private listeners = new Set<{
    topic: string
    callback: (data: any, res: Res) => void
  }>()
  private requests = new Array<Req>()

  public client: MqttClient

  constructor(
    private mqttAddress: string,
    private deviceId: string,
    private username?: string,
    private password?: string
  ) {
    super()

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
    if (this.connected) return Promise.resolve()
    this.disconnect()

    if (!MQTTLink.sharedClient.has(this.mqttAddress)) {
      const client = connect(
        this.mqttAddress,
        {
          username: this.username,
          password: this.password,
          clientId: createClientId(),
        }
      )

      MQTTLink.sharedClient.set(this.mqttAddress, {
        connections: 0,
        client,
      })
    }

    const sharedClient = MQTTLink.sharedClient.get(this.mqttAddress)

    this.client = sharedClient.client
    this.client.on('message', this.onMessage)
    this.client.on('connect', this.onConnect)
    this.client.on('close', this.onDisconnect)
    sharedClient.connections++

    // onConnect won't be called from sharedClient
    this.connected = this.client.connected

    return new Promise<void>(resolve => {
      this.client.once('connect', resolve)
    })
  }

  public disconnect() {
    if (!this.client) return

    this.client.off('message', this.onMessage)
    this.client.off('connect', this.onConnect)
    this.client.off('close', this.onDisconnect)

    const sharedClient = MQTTLink.sharedClient.get(this.mqttAddress)
    if (sharedClient) {
      sharedClient.connections--

      if (sharedClient.connections === 0) {
        this.client.end()
        MQTTLink.sharedClient.delete(this.mqttAddress)
      }
    }

    this.client = null
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

  public dispose() {
    super.dispose()
    this.disconnect()
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

    this.lastOnline = +new Date()

    const res = new Res(id, data, packet)

    this.listeners.forEach(listener => {
      if (listener.topic === topic) {
        listener.callback(data, res)
      }
    })
  }

  private onConnect = () => {
    this.connected = true
  }

  private onDisconnect = () => {
    this.connected = false
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
