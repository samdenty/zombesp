import { Connection } from './Connection'
import { Entity, Column, OneToMany } from 'typeorm'
import { Zombie } from '../Zombie'

@Entity()
export class MQTTConnection extends Connection {
  @OneToMany(type => Zombie, zombie => zombie.mqttConnection)
  zombies: Zombie[]

  @Column() address: string

  @Column() port: number

  @Column({ nullable: true })
  username?: string

  @Column({ nullable: true })
  password?: string
}
