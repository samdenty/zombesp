import * as DB from '@esprat/db'
import { Zombie } from './Zombie'
import { observable } from 'mobx'

export class MQTTConnection extends DB.MQTTConnection {
  @observable public zombies: Zombie[]
}
