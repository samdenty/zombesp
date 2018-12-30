import { plainToClass } from 'class-transformer'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { IDatabase, Zombie, DirectConnection, MQTTConnection } from '@esprat/db'
import * as Types from './__generated'
import * as Queries from './queries'

export class GraphQLDatabase implements IDatabase {
  private client: ApolloClient<any>

  public connect(uri: string) {
    const cache = new InMemoryCache()

    this.client = new ApolloClient({
      link: new HttpLink({ uri }),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
      cache,
    })
  }

  public isConnected() {
    // @TODO: Check if we're connected / can connect to the server
    // otherwise this prevents dual-db from kicking in
    // return this.client ? true : false
    return false
  }

  public async getZombies() {
    const { data } = await this.client.query<Types.GetZombies>({
      query: Queries.GET_ZOMBIES,
      variables: {},
    })

    return plainToClass(Zombie, data.zombies)
  }

  public async getZombie(id: string) {
    const { data } = await this.client.query<
      Types.GetZombie,
      Types.GetZombieVariables
    >({
      query: Queries.GET_ZOMBIE,
      variables: { id },
    })

    return plainToClass(Zombie, data.zombie)
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

  public async getDirectConnection(id: string) {
    const { data } = await this.client.query<
      Types.GetDirectConnection,
      Types.GetDirectConnectionVariables
    >({
      query: Queries.GET_DIRECT_CONNECTION,
      variables: { id },
    })

    return plainToClass(DirectConnection, data.directConnection)
  }

  public async getDirectConnections(
    filter: {
      zombieId?: string
    } = {}
  ) {
    const { data } = await this.client.query<
      Types.GetDirectConnections,
      Types.GetDirectConnectionsVariables
    >({
      query: Queries.GET_DIRECT_CONNECTIONS,
      variables: { filter },
    })

    return plainToClass(DirectConnection, data.directConnections)
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

  public async getMQTTConnection(id: number) {
    const { data } = await this.client.query<
      Types.GetMQTTConnection,
      Types.GetMQTTConnectionVariables
    >({
      query: Queries.GET_MQTT_CONNECTION,
      variables: { id: id as any },
    })

    return plainToClass(MQTTConnection, data.mqttConnection)
  }

  public async getMQTTConnections(
    filter: {
      address?: string
    } = {}
  ) {
    const { data } = await this.client.query<
      Types.GetMQTTConnections,
      Types.GetMQTTConnectionsVariables
    >({
      query: Queries.GET_MQTT_CONNECTIONS,
      variables: { filter },
    })

    return plainToClass(MQTTConnection, data.mqttConnections)
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
