import * as DB from '@esprat/db'
import { Connection, MQTTLink } from '@esprat/connection'
import { MQTTConnection } from './MQTTConnection'
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

          if (this.mqttLink) this.mqttLink.disconnect()

          this.mqttLink = new MQTTLink(
            this.mqttConnection.address,
            this.id,
            this.mqttConnection.username,
            this.mqttConnection.password
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
