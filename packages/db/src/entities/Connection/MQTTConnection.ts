import { Connection } from './Connection'
import { Entity, Column, OneToMany } from 'typeorm'
import { Zombie } from '../Zombie'
import { ObjectType, Field } from 'type-graphql'

@Entity()
@ObjectType({ implements: Connection })
export class MQTTConnection extends Connection {
  @Field(type => Zombie)
  @OneToMany(type => Zombie, zombie => zombie.mqttConnection, {
    onDelete: 'SET NULL',
  })
  zombies: Zombie[]

  @Field()
  @Column()
  address: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string
}
