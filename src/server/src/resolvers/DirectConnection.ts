import { Resolver, Query, Arg, ID, Ctx, Mutation } from 'type-graphql'
import { Zombie, DirectConnection } from '@esprat/db'
import { Context } from '../types'

@Resolver()
export class DirectConnectionResolver {
  @Mutation(type => DirectConnection)
  async addDirectConnection(
    @Arg('zombieId', type => ID)
    zombieId: string,
    @Arg('address') address: string,
    @Ctx() { database }: Context
  ) {
    const connection = await database.addDirectConnection(zombieId, address)
    return connection
  }

  @Mutation(type => Boolean)
  async removeDirectConnection(
    @Arg('zombieId', type => ID)
    zombieId: string,
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const result = await database.removeDirectConnection(zombieId, id)
    return result
  }
}
