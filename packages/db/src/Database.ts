import { ConnectionOptions, createConnection, Connection } from 'typeorm'
import { allEntities } from './allEntities'
import { Zombie, DirectConnection, MQTTConnection } from './entities'

export interface IDatabase {
  connect(options?: any): Promise<void>

  getZombie(id: string): Promise<Zombie>
  getZombies(): Promise<Zombie[]>
  createZombie(id: string): Promise<Zombie>
  deleteZombie(id: string): Promise<boolean>

  addDirectConnection(
    zombieId: string,
    address: string
  ): Promise<DirectConnection>
  removeDirectConnection(zombieId: string, id: string): Promise<boolean>
  getDirectConnection(id: string): Promise<DirectConnection>
  getDirectConnections(filter?: {
    zombieId?: string
  }): Promise<DirectConnection[]>

  createMQTTConnection(
    address: string,
    auth?: { username: string; password?: string }
  ): Promise<MQTTConnection>
  deleteMQTTConnection(id: number): Promise<boolean>
  getMQTTConnection(id: number): Promise<MQTTConnection>
  getMQTTConnections(filter?: { address?: string }): Promise<MQTTConnection[]>
  setMQTTConnection(zombieId: string, id?: number): Promise<MQTTConnection>
}

export class Database implements IDatabase {
  public connection: Connection = null

  constructor() {}

  private get directConnectionRepo() {
    return this.connection.getRepository(DirectConnection)
  }
  private get mqttConnectionRepo() {
    return this.connection.getRepository(MQTTConnection)
  }
  private get zombieRepo() {
    return this.connection.getRepository(Zombie)
  }

  public async connect(options: Partial<ConnectionOptions>) {
    this.connection = await createConnection({
      entities: allEntities,
      ...options,
    } as ConnectionOptions)
  }

  public async getZombie(id: string) {
    const zombie = await this.zombieRepo.findOne({
      where: { id },
      relations: ['directConnections', 'mqttConnection'],
    })

    return zombie
  }

  public async getZombies() {
    const zombies = await this.zombieRepo.find({
      relations: ['directConnections', 'mqttConnection'],
    })

    return zombies
  }

  public async createZombie(id: string) {
    const zombie = this.zombieRepo.create({ id })
    await this.connection.manager.save(zombie)

    return zombie
  }

  public async deleteZombie(id: string) {
    const { affected } = await this.zombieRepo.delete({ id })

    return !!affected
  }

  public async addDirectConnection(zombieId: string, address: string) {
    const directConnection = this.directConnectionRepo.create({
      address,
      zombie: {
        id: zombieId,
      },
    })

    await this.connection.manager.save(directConnection)

    return directConnection
  }

  public async removeDirectConnection(zombieId: string, id: string) {
    const { affected } = await this.directConnectionRepo.delete({
      id,
      zombie: {
        id: zombieId,
      },
    })

    return !!affected
  }

  public async getDirectConnection(id: string) {
    const connection = await this.directConnectionRepo.findOne({ id })
    return connection
  }

  public async getDirectConnections(filter: { zombieId?: string } = {}) {
    const connections = await this.directConnectionRepo.find({
      ...(filter.zombieId && { zombie: { id: filter.zombieId } }),
    })

    return connections
  }

  public async createMQTTConnection(
    address: string,
    { username, password }: { username: string; password?: string } = {} as any
  ) {
    const mqttConnection = this.mqttConnectionRepo.create({
      address,
      username,
      password,
    })

    await this.connection.manager.save(mqttConnection)

    return mqttConnection
  }

  public async deleteMQTTConnection(id: number) {
    const { affected } = await this.mqttConnectionRepo.delete({ id })

    return !!affected
  }

  public async getMQTTConnection(id: number) {
    const mqttConnection = await this.mqttConnectionRepo.findOne({ id })
    return mqttConnection
  }

  public async getMQTTConnections(filter: { address?: string } = {}) {
    const mqttConnections = await this.mqttConnectionRepo.find({
      ...(filter.address && { address: filter.address }),
    })
    return mqttConnections
  }

  public async setMQTTConnection(zombieId: string, id?: number) {
    const zombie = await this.zombieRepo.findOne({ id: zombieId })

    if (id) {
      const mqttConnection = await this.mqttConnectionRepo.findOne({ id })
      if (!mqttConnection) throw `Couldn't find MQTT connection`
      zombie.mqttConnection = mqttConnection
    } else {
      zombie.mqttConnection = null
    }

    const result = await this.connection.manager.save(zombie)

    return result.mqttConnection
  }
}
