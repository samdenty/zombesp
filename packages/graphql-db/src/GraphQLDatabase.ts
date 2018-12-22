import { plainToClass } from 'class-transformer'
import ApolloClient from 'apollo-boost'
import { IDatabase, Zombie, DirectConnection, MQTTConnection } from '@esprat/db'
import * as Types from './__generated'
import * as Queries from './queries'

export class GraphQLDatabase implements IDatabase {
  private client: ApolloClient<any>

  constructor(uri: string) {
    this.client = new ApolloClient({ uri })
  }

  public async connect() {}

  public async getZombie(id: string) {
    const { data } = await this.client.query<
      Types.GetZombie,
      Types.GetZombieVariables
    >({
      query: Queries.GET_ZOMBIE,
      variables: { id },
    })

    return plainToClass(Zombie, data.getZombie)
  }

  public async createZombie(id: string) {
    const { data } = await this.client.mutate<
      Types.CreateZombie,
      Types.CreateZombieVariables
    >({
      mutation: Queries.CREATE_ZOMBIE,
      variables: { id },
    })

    return plainToClass(Zombie, data.createZombie)
  }

  public async deleteZombie(id: string) {
    const { data } = await this.client.mutate<
      Types.DeleteZombie,
      Types.DeleteZombieVariables
    >({
      mutation: Queries.DELETE_ZOMBIE,
      variables: { id },
    })

    return data.deleteZombie
  }

  public async addDirectConnection(zombieId: string, address: string) {
    const { data } = await this.client.mutate<
      Types.AddDirectConnection,
      Types.AddDirectConnectionVariables
    >({
      mutation: Queries.ADD_DIRECT_CONNECTION,
      variables: { zombieId, address },
    })

    return plainToClass(DirectConnection, data.addDirectConnection)
  }

  public async removeDirectConnection(zombieId: string, id: string) {
    const { data } = await this.client.mutate<
      Types.RemoveDirectConnection,
      Types.RemoveDirectConnectionVariables
    >({
      mutation: Queries.REMOVE_DIRECT_CONNECTION,
      variables: { zombieId, id },
    })

    return data.removeDirectConnection
  }

  public async createMQTTConnection(
    address: string,
    auth?: { username: string; password?: string }
  ) {
    const { data } = await this.client.mutate<
      Types.CreateMQTTConnection,
      Types.CreateMQTTConnectionVariables
    >({
      mutation: Queries.CREATE_MQTT_CONNECTION,
      variables: { address, auth },
    })

    return plainToClass(MQTTConnection, data.createMQTTConnection)
  }

  public async deleteMQTTConnection(id: any) {
    const { data } = await this.client.mutate<
      Types.DeleteMQTTConnection,
      Types.DeleteMQTTConnectionVariables
    >({
      mutation: Queries.DELETE_MQTT_CONNECTION,
      variables: { id },
    })

    return data.deleteMQTTConnection
  }

  public async setMQTTConnection(zombieId: string, id?: any) {
    const { data } = await this.client.mutate<
      Types.SetMQTTConnection,
      Types.SetMQTTConnectionVariables
    >({
      mutation: Queries.SET_MQTT_CONNECTION,
      variables: { zombieId, id },
    })

    return plainToClass(MQTTConnection, data.setMQTTConnection)
  }
}
