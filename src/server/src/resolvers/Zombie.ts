import { Resolver, Query, Arg, ID, Ctx, Mutation } from 'type-graphql'
import { Zombie } from '@esprat/db'
import { Context } from '../types'

@Resolver()
export class ZombieResolver {
  @Query(type => Zombie, { nullable: true })
  async getZombie(
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const zombie = await database.getZombie(id)
    return zombie
  }

  @Mutation(type => Zombie)
  async createZombie(
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const zombie = await database.createZombie(id)
    return zombie
  }

  @Mutation(type => Boolean)
  async deleteZombie(
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const result = await database.deleteZombie(id)
    return result
  }
}
