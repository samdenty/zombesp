import { ConnectionOptions, createConnection, Connection } from 'typeorm'
import { allEntities } from './allEntities'
import { Zombie, DirectConnection, MQTTConnection } from './entities'

export interface IDatabase {
  connect(options?: any): Promise<void>

  getZombie(id: string): Promise<Zombie>
  addZombie(id: string): Promise<void>
  removeZombie(id: string): Promise<void>

  addDirectConnection(
    zombieId: string,
    connection: DirectConnection
  ): Promise<void>
  removeDirectConnection(zombieId: string, id: string): Promise<void>
}

export class Database implements IDatabase {
  public connection: Connection = null

  constructor() {}

  public async connect(options: Partial<ConnectionOptions>) {
    this.connection = await createConnection({
      ...options,
      entities: [...allEntities, ...options.entities],
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

  public async addZombie(id: string) {
    const zombieRepo = this.connection.getRepository(Zombie)

    const zombie = zombieRepo.create({ id })
    await this.connection.manager.save(zombie)
  }

  public async removeZombie(id: string) {
    const zombieRepo = this.connection.getRepository(Zombie)

    await zombieRepo.delete({ id })
  }

  public async addDirectConnection(
    zombieId: string,
    connection: DirectConnection
  ) {
    const directConnectionRepo = this.connection.getRepository(DirectConnection)

    const directConnection = directConnectionRepo.create({
      ...connection,
      zombie: {
        id: zombieId,
      },
    })

    await this.connection.manager.save(directConnection)
  }

  public async removeDirectConnection(zombieId: string, id: string) {
    const directConnectionRepo = this.connection.getRepository(DirectConnection)

    await directConnectionRepo.delete({
      id,
      zombie: {
        id: zombieId,
      },
    })
  }

  public async setMQTTConnection(zombieId: string, connection: MQTTConnection) {
    const mqttConnectionRepo = this.connection.getRepository(MQTTConnection)
    const zombieRepo = this.connection.getRepository(Zombie)

    const zombie = await zombieRepo.findOne({
      where: { id: zombieId },
    })

    const mqttConnection = mqttConnectionRepo.create({
      ...connection,
      zombies: [zombie],
    })

    await this.connection.manager.save(mqttConnection)
  }
}
