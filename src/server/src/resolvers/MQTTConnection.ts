import {
  FieldResolver,
  Root,
  Resolver,
  Query,
  Arg,
  ID,
  Ctx,
  Mutation,
} from 'type-graphql'
import { MQTTConnection } from '@esprat/db'
import { Context } from '../types'
import {
  MQTTConnectionAuthInput,
  MQTTConnectionsFilterInput,
} from '../entities'

@Resolver(of => MQTTConnection)
export class MQTTConnectionResolver {
  @Query(type => MQTTConnection)
  async mqttConnection(
    @Arg('id', type => ID)
    id: number,
    @Ctx() { database }: Context
  ) {
    const connection = await database.getMQTTConnection(id)
    return connection
  }

  @Query(type => [MQTTConnection])
  async mqttConnections(
    @Arg('filter', { nullable: true })
    filter: MQTTConnectionsFilterInput,
    @Ctx() { database }: Context
  ) {
    const connections = await database.getMQTTConnections(filter)
    return connections
  }

  @Mutation(type => MQTTConnection)
  async createMQTTConnection(
    @Arg('address') address: string,
    @Arg('auth', { nullable: true })
    auth: MQTTConnectionAuthInput,
    @Ctx() { database }: Context
  ) {
    const connection = await database.createMQTTConnection(address, auth)
    return connection
  }

  @Mutation(type => Boolean)
  async deleteMQTTConnection(
    @Arg('id', type => ID)
    id: number,
    @Ctx() { database }: Context
  ) {
    const result = await database.deleteMQTTConnection(id)
    return result
  }

  @Mutation(type => MQTTConnection)
  async setMQTTConnection(
    @Arg('zombieId', type => ID)
    zombieId: string,
    @Arg('id', type => ID, { nullable: true })
    id: number,
    @Ctx() { database }: Context
  ) {
    const result = await database.setMQTTConnection(zombieId, id)
    return result
  }

  @FieldResolver()
  async zombies(
    @Root() mqttConnection: MQTTConnection,
    @Ctx() { database }: Context
  ) {
    const zombies = await Promise.all(
      mqttConnection.zombies.map(zombie => database.getZombie(zombie.id))
    )

    return zombies
  }
}
