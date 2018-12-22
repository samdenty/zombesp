import { IDatabase, DirectConnection } from '@esprat/db'

export class GraphQLDB /*implements IDatabase*/ {
  public async connect(options?: any) {}

  public async getZombie(id: string) {
    return null
  }

  public async createZombie(id: string) {
    return null
  }

  public async deleteZombie(id: string) {}

  public async addDirectConnection(
    zombieId: string,
    connection: DirectConnection
  ) {}

  public async removeDirectConnection(zombieId: string, id: string) {}
}
