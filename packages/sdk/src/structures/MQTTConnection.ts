import { MQTTLink } from '@esprat/connection'
import * as DB from '@esprat/db'
import { observable, computed } from 'mobx'
import { SDK } from '../SDK'

export class MQTTConnection extends DB.MQTTConnection {
  private disposers: Function[]

  @computed
  public get links() {
    const links = observable.map(
      this.zombies.map(({ id, mqttLink }): [string, MQTTLink] => [id, mqttLink])
    )

    return links
  }

  @computed
  public get zombies() {
    return Array.from(this.sdk.zombies.values()).filter(
      ({ mqttConnection }) => mqttConnection && mqttConnection.id === this.id
    )
  }

  constructor(private sdk: SDK) {
    super()

    this.disposers = []
  }

  public dispose() {
    this.disposers.forEach(dispose => dispose())
    this.links.forEach(link => link.dispose())
  }
}
