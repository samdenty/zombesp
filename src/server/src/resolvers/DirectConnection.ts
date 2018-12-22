import {
  Root,
  Resolver,
  Query,
  Arg,
  FieldResolver,
  ID,
  Ctx,
  Mutation,
  Args,
} from 'type-graphql'
import { DirectConnection } from '@esprat/db'
import { Context } from '../types'
import { DirectConnectionsFilterInput } from '../entities'

@Resolver(of => DirectConnection)
export class DirectConnectionResolver {
  @Query(type => DirectConnection)
  async directConnection(
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const connection = await database.getDirectConnection(id)
    return connection
  }

  @Query(type => [DirectConnection])
  async directConnections(
    @Arg('filter', { nullable: true })
    filter: DirectConnectionsFilterInput,
    @Ctx() { database }: Context
  ) {
    const connection = await database.getDirectConnections(filter)
    return connection
  }

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

  @FieldResolver()
  async zombie(
    @Root() directConnection: DirectConnection,
    @Ctx() { database }: Context
  ) {
    const zombie = await database.getZombie(directConnection.zombie.id)

    return zombie
  }
}
