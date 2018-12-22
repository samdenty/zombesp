import { Resolver, Query, Arg, ID, Ctx, Mutation } from 'type-graphql'
import { MQTTConnection } from '@esprat/db'
import { Context } from '../types'
import { MQTTConnectionAuthInput } from '../entities'

@Resolver()
export class MQTTConnectionResolver {
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
    @Arg('id') id: number,
    @Ctx() { database }: Context
  ) {
    const result = await database.deleteMQTTConnection(id)
    return result
  }

  @Mutation(type => Boolean)
  async setMQTTConnection(
    @Arg('zombieId', type => ID)
    zombieId: string,
    @Arg('id', { nullable: true })
    id: number,
    @Ctx() { database }: Context
  ) {
    const result = await database.setMQTTConnection(zombieId, id)
    return result
  }
}
