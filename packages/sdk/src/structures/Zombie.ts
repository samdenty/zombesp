import * as DB from '@esprat/db'
import { MQTTConnection } from './MQTTConnection'
import { DirectConnection } from './DirectConnection'
import { observable } from 'mobx'

export class Zombie extends DB.Zombie {
  @observable public directConnections: DirectConnection[]
  @observable public mqttConnection?: MQTTConnection

  constructor() {
    super()
  }
}
