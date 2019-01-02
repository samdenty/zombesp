import * as DB from '@esprat/db'
import { Connection, MQTTLink, DirectLink } from '@esprat/connection'
import { MQTTConnection } from './MQTTConnection'
import { DirectConnection } from './DirectConnection'
import { observable, autorun, computed, reaction } from 'mobx'
import { SDK } from '../SDK'

export class Zombie extends DB.Zombie {
  private disposers: Function[]

  @observable public connection: Connection
  @observable public mqttLink: MQTTLink
  @observable public mqttConnection?: MQTTConnection

  @computed
  public get directConnections() {
    return Array.from(this.sdk.directConnections.values()).filter(
      ({ zombie }) => zombie && zombie.id === this.id
    )
  }

  @computed
  public get links(): Map<
    DirectConnection | MQTTConnection,
    DirectLink | MQTTLink
  > {
    return observable.map([
      ...this.directConnections.map(connection => [
        connection,
        connection.link,
      ]),
      this.mqttConnection && [
        this.mqttConnection,
        this.mqttConnection.links.get(this.id),
      ],
    ].filter(Boolean) as any)
  }

  @computed
  public get connectionCount() {
    return +!!this.mqttConnection + this.directConnections.length
  }

  constructor(private sdk: SDK) {
    super()
    this.connection = new Connection()

    this.disposers = [
      autorun(() => {
        if (this.directConnections) {
          this.connection.links.clear()

          this.directConnections.forEach(({ link }) => {
            this.connection.links.add(link)
          })
        }
      }),
      reaction(
        () =>
          this.mqttConnection && [
            this.mqttConnection.address,
            this.mqttConnection.username,
            this.mqttConnection.password,
          ],
        () => {
          if (!this.mqttConnection) return null

          if (this.mqttLink) this.mqttLink.dispose()

          this.mqttLink = new MQTTLink(
            this.mqttConnection.address,
            this.id,
            this.mqttConnection.username,
            this.mqttConnection.password
          )

          this.sdk.hydrate(
            this.mqttLink,
            `${this.id}:${this.mqttConnection.id}`
          )
        }
      ),
    ]
  }

  public dispose() {
    if (this.mqttLink) this.mqttLink.disconnect()

    this.disposers.forEach(dispose => dispose())
  }
}
