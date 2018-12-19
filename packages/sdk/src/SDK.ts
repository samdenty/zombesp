import { ConnectionOptions, createConnection, Connection } from 'typeorm'
import { allEntities } from './allEntities'
import { Zombie, DirectConnection } from './entities'

interface ISDK {
  connect(options?: any): Promise<void>
}

export class SDK implements ISDK {
  public connection: Connection = null

  constructor() {}

  public async connect(options: Partial<ConnectionOptions>) {
    this.connection = await createConnection({
      ...options,
      entities: [...allEntities, ...options.entities],
    } as ConnectionOptions)
  }

  public async addZombie(id: string) {
    const zombie = new Zombie()
    zombie.id = id

    const connection = new DirectConnection()
    connection.id = 'test'
    connection.address = '192.168.1.102'
    connection.port = 1337

    zombie.connections = [connection]

    await this.connection.manager.save(zombie)
  }
}
