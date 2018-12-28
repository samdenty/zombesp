import * as DB from '@esprat/db'
import { Zombie } from './Zombie'
import { observable } from 'mobx'

export class DirectConnection extends DB.DirectConnection {
  @observable public zombie: Zombie
}
