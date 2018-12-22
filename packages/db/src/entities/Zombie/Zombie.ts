import { Type } from 'class-transformer'
import { ObjectType, Field, ID } from 'type-graphql'
import { Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm'
import { DirectConnection, MQTTConnection } from '../Connection'

@Entity('zombies')
@ObjectType()
export class Zombie {
  @Field(type => ID)
  @PrimaryColumn()
  id: string

  @Type(type => DirectConnection)
  @Field(type => DirectConnection)
  @OneToMany(type => DirectConnection, connection => connection.zombie)
  directConnections: DirectConnection[]

  @Type(type => MQTTConnection)
  @Field(type => MQTTConnection, { nullable: true })
  @ManyToOne(type => MQTTConnection, connection => connection.zombies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  mqttConnection?: MQTTConnection
}
