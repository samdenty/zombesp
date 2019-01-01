import './utils/makeObservable'
import { observable, computed } from 'mobx'
import * as DB from '@esprat/db'

import { Zombie, DirectConnection, MQTTConnection } from './structures'

export class SDK<Database extends DB.IDatabase = DB.IDatabase> {
  @observable zombies = new Map<string, Zombie>()
  @observable mqttConnections = new Map<number, MQTTConnection>()
  @observable directConnections = new Map<number, DirectConnection>()

  constructor(public database: Database) {}

  public async fetch() {
    await Promise.all([
      this.fetchZombies(),
      this.fetchDirectConnections(),
      this.fetchMqttConnections(),
    ])
  }

  public async fetchZombies() {
    const zombies = await this.database.getZombies()

    // Remove deleted zombies
    for (const [, zombie] of this.zombies) {
      if (!zombies.find(({ id }) => id === zombie.id)) {
        zombie.dispose()
        this.zombies.delete(zombie.id)
      }
    }

    zombies.forEach(z => this.updateZombie(z))
  }

  private updateZombie(data: DB.Zombie) {
    const zombie = this.zombies.get(data.id) || new Zombie(this)
    delete data['directConnections']

    Object.assign(zombie, data)

    // Link MQTT
    const mqttConnection = this.mqttConnections.get(
      data.mqttConnection && data.mqttConnection.id
    )
    zombie.mqttConnection = mqttConnection

    this.zombies.set(zombie.id, zombie)
  }

  public async fetchMqttConnections() {
    const mqttConnections = await this.database.getMQTTConnections()

    // Remove deleted connections
    for (const [, mqttConnection] of this.mqttConnections) {
      if (!mqttConnections.find(({ id }) => id === mqttConnection.id)) {
        mqttConnection.dispose()
        this.mqttConnections.delete(mqttConnection.id)
      }
    }

    mqttConnections.forEach(m => this.updateMqttConnection(m))
  }

  private updateMqttConnection(data: DB.MQTTConnection) {
    const mqttConnection =
      this.mqttConnections.get(data.id) || new MQTTConnection(this)

    for (const { id } of data.zombies) {
      const zombie = this.zombies.get(id)

      if (zombie) zombie.mqttConnection = mqttConnection
    }

    delete data['zombies']
    Object.assign(mqttConnection, data)

    this.mqttConnections.set(mqttConnection.id, mqttConnection)
  }

  public async fetchDirectConnections() {
    const directConnections = await this.database.getDirectConnections()

    // Remove deleted connections
    for (const [, directConnection] of this.directConnections) {
      if (!directConnections.find(({ id }) => id === directConnection.id)) {
        directConnection.dispose()
        this.directConnections.delete(directConnection.id)
      }
    }

    directConnections.forEach(d => this.updateDirectConnection(d))
  }

  private updateDirectConnection(data: DB.DirectConnection) {
    const directConnection =
      this.directConnections.get(data.id) || new DirectConnection()

    Object.assign(directConnection, data)

    const zombie = data.zombie ? this.zombies.get(data.zombie.id) : null
    directConnection.zombie = zombie

    this.directConnections.set(directConnection.id, directConnection)
  }

  // public async connectToZombie(id: string) {
  //   const zombie = await this.database.getZombie(id)
  //   if (!zombie) return null

  //   const directConnections = zombie.directConnections.map(
  //     ({ address }) => new DirectConnection(address)
  //   )

  //   const mqttConnection =
  //     zombie.mqttConnection &&
  //     new CloudConnection(zombie.mqttConnection.address, zombie.id)

  //   const protocols = [...directConnections, mqttConnection].filter(Boolean)
  //   const espCom = new ESPCom(protocols)

  //   return espCom
  // }

  // public async isZombieAlive() {
  //   return true
  // }
}
