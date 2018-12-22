import { ConnectionOptions, createConnection, Connection } from 'typeorm'
import { allEntities } from './allEntities'
import { Zombie, DirectConnection, MQTTConnection } from './entities'

export interface IDatabase {
  connect(options?: any): Promise<void>

  getZombie(id: string): Promise<Zombie>
  createZombie(id: string): Promise<Zombie>
  deleteZombie(id: string): Promise<boolean>

  addDirectConnection(
    zombieId: string,
    address: string
  ): Promise<DirectConnection>
  removeDirectConnection(zombieId: string, id: string): Promise<boolean>

  createMQTTConnection(
    address: string,
    auth?: { username: string; password?: string }
  ): Promise<MQTTConnection>
  deleteMQTTConnection(id: number): Promise<boolean>

  setMQTTConnection(zombieId: string, id?: number): Promise<Zombie>
}

export class Database implements IDatabase {
  public connection: Connection = null

  constructor() {}

  public async connect(options: Partial<ConnectionOptions>) {
    this.connection = await createConnection({
      entities: allEntities,
      ...options,
    } as ConnectionOptions)
  }

  public async getZombie(id: string) {
    const zombieRepo = this.connection.getRepository(Zombie)

    const zombie = await zombieRepo.findOne({
      where: { id },
      relations: ['directConnections', 'mqttConnection'],
    })

    return zombie
  }

  public async createZombie(id: string) {
    const zombieRepo = this.connection.getRepository(Zombie)

    const zombie = zombieRepo.create({ id })
    await this.connection.manager.save(zombie)

    return zombie
  }

  public async deleteZombie(id: string) {
    const zombieRepo = this.connection.getRepository(Zombie)
    const { affected } = await zombieRepo.delete({ id })

    return !!affected
  }

  public async addDirectConnection(zombieId: string, address: string) {
    const directConnectionRepo = this.connection.getRepository(DirectConnection)

    const directConnection = directConnectionRepo.create({
      address,
      zombie: {
        id: zombieId,
      },
    })

    await this.connection.manager.save(directConnection)

    return directConnection
  }

  public async removeDirectConnection(zombieId: string, id: string) {
    const directConnectionRepo = this.connection.getRepository(DirectConnection)

    const { affected } = await directConnectionRepo.delete({
      id,
      zombie: {
        id: zombieId,
      },
    })

    return !!affected
  }

  public async createMQTTConnection(
    address: string,
    { username, password }: { username: string; password?: string } = {} as any
  ) {
    const mqttConnectionRepo = this.connection.getRepository(MQTTConnection)

    const mqttConnection = mqttConnectionRepo.create({
      address,
      username,
      password,
    })

    await this.connection.manager.save(mqttConnection)

    return mqttConnection
  }

  public async deleteMQTTConnection(id: number) {
    const mqttConnectionRepo = this.connection.getRepository(MQTTConnection)

    const { affected } = await mqttConnectionRepo.delete({ id })

    return !!affected
  }

  public async setMQTTConnection(zombieId: string, id?: number) {
    const zombieRepo = this.connection.getRepository(Zombie)
    const mqttConnectionRepo = this.connection.getRepository(MQTTConnection)

    const zombie = await zombieRepo.findOne({ id: zombieId })

    if (id) {
      const mqttConnection = await mqttConnectionRepo.findOne({ id })
      if (!mqttConnection) throw `Couldn't find MQTT connection`
      zombie.mqttConnection = mqttConnection
    } else {
      zombie.mqttConnection = null
    }

    return await this.connection.manager.save(zombie)
  }
}
