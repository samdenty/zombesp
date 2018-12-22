import {
  Resolver,
  Query,
  Arg,
  ID,
  Ctx,
  Mutation,
  Root,
  FieldResolver,
} from 'type-graphql'
import { Zombie } from '@esprat/db'
import { Context } from '../types'

@Resolver(of => Zombie)
export class ZombieResolver {
  @Query(type => Zombie, { nullable: true })
  async zombie(
    @Arg('id', type => ID)
    id: string,
    @Ctx() { database }: Context
  ) {
    const zombie = await database.getZombie(id)
    return zombie
  }

  @Query(type => [Zombie])
  async zombies(@Ctx() { database }: Context) {
    const zombies = await database.getZombies()
    return zombies
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

  @FieldResolver()
  async directConnections(@Root() root: Zombie, @Ctx() { database }: Context) {
    if (root.directConnections) return root.directConnections

    const directConnections = await database.getDirectConnections({
      zombieId: root.id,
    })

    return directConnections
  }

  @FieldResolver()
  async mqttConnection(@Root() root: Zombie, @Ctx() { database }: Context) {
    if (root.mqttConnection === undefined) {
      // TODO: Implement this:
      // const directConnections = await database.getMQTTConnections({
      //   zombieId: root.id,
      // })
    }

    return root.directConnections
  }
}
