import {
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { DirectConnection, MQTTConnection } from '../Connection'

@Entity('zombies')
export class Zombie {
  @PrimaryGeneratedColumn() id: string

  @OneToMany(type => DirectConnection, connection => connection.zombie)
  directConnections: DirectConnection[]

  @ManyToOne(type => MQTTConnection, connection => connection.zombies, {
    nullable: true,
  })
  mqttConnection?: MQTTConnection
}
