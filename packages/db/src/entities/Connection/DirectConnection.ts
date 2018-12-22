import { Connection } from './Connection'
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { Zombie } from '../Zombie'
import { ObjectType, Field } from 'type-graphql'

@Entity()
@ObjectType({ implements: Connection })
export class DirectConnection extends Connection {
  @Field(type => Zombie)
  @ManyToOne(type => Zombie, zombie => zombie.directConnections, {
    onDelete: 'CASCADE',
  })
  zombie: Zombie

  @Field()
  @Column()
  address: string
}
