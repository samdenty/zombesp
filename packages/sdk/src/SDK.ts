import './utils/makeObservable'
import { observable, runInAction, action } from 'mobx'
import { create, IHydrateResult } from 'mobx-persist'
import * as DB from '@esprat/db'

import { Zombie, DirectConnection, MQTTConnection } from './structures'

export class SDK<Database extends DB.IDatabase = DB.IDatabase> {
  private hydrator: ReturnType<typeof create> = null

  @observable zombies = new Map<string, Zombie>()
  @observable mqttConnections = new Map<number, MQTTConnection>()
  @observable directConnections = new Map<number, DirectConnection>()

  constructor(
    public database: Database,
    public storage: Storage = typeof localStorage !== 'undefined'
      ? localStorage
      : null
  ) {
    this.hydrator = this.storage ? create({ storage: this.storage }) : null
  }

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

  @action
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

  @action
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

  @action
  private updateDirectConnection(data: DB.DirectConnection) {
    const directConnection =
      this.directConnections.get(data.id) || new DirectConnection(this)

    Object.assign(directConnection, data)

    const zombie = data.zombie ? this.zombies.get(data.zombie.id) : null
    directConnection.zombie = zombie

    this.directConnections.set(directConnection.id, directConnection)
  }

  public hydrate<T extends Object>(
    store: T,
    key?: string | number
  ): IHydrateResult<T> {
    if (!this.hydrator) return

    if (key) {
      key = `#${key}`
    } else {
      if ('id' in store) {
        const { id }: any = store

        // Use generic id property on object
        if (typeof id === 'string' || typeof id === 'number') {
          key = `:${id}`
        }
      } else {
        // Fallback to hash of implementation
        if ('prototype' in store) {
          key = `@${Object.getOwnPropertyNames((store as any).prototype).join(
            ','
          )}`
        } else {
          key = `~${Object.keys(store).join(',')}`
        }
      }
    }

    const token = `${store.constructor.name}${key}`

    return this.hydrator(token, store)
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
