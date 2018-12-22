import { ObjectType, Field, ID } from 'type-graphql'
import { Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm'
import { DirectConnection, MQTTConnection } from '../Connection'

@Entity('zombies')
@ObjectType()
export class Zombie {
  @Field(type => ID)
  @PrimaryColumn()
  id: string

  @Field(type => DirectConnection)
  @OneToMany(type => DirectConnection, connection => connection.zombie)
  directConnections: DirectConnection[]

  @Field(type => MQTTConnection, { nullable: true })
  @ManyToOne(type => MQTTConnection, connection => connection.zombies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  mqttConnection?: MQTTConnection
}
