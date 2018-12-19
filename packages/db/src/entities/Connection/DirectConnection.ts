import { Connection } from './Connection'
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { Zombie } from '../Zombie'

@Entity()
export class DirectConnection extends Connection {
  @ManyToOne(type => Zombie, zombie => zombie.directConnections, {
    nullable: true,
  })
  zombie?: Zombie

  @Column() address: string
  @Column() port: number
}
