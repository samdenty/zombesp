import { Connection } from './Connection'
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { Zombie } from '../Zombie'
import { ObjectType, Field } from 'type-graphql'
import { Type } from 'class-transformer'

@Entity()
@ObjectType({ implements: Connection })
export class DirectConnection extends Connection {
  @Type(type => Zombie)
  @Field(type => Zombie)
  @ManyToOne(type => Zombie, zombie => zombie.directConnections, {
    onDelete: 'CASCADE',
    eager: true,
  })
  zombie: Zombie

  @Field()
  @Column()
  address: string
}
