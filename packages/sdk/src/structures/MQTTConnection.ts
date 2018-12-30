import { MQTTLink } from '@esprat/connection'
import * as DB from '@esprat/db'
import { Zombie } from './Zombie'
import { observable, autorun, computed, reaction } from 'mobx'
import { SDK } from '../SDK'

export class MQTTConnection extends DB.MQTTConnection {
  private disposers: Function[]

  @computed
  public get links() {
    const links = observable.map<string, MQTTLink>()
    this.zombies.forEach(({ id, mqttLink }) => links.set(id, mqttLink))
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
    this.links.forEach(link => link.disconnect())
  }
}
