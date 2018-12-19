import { Entity, PrimaryColumn, ManyToMany } from 'typeorm'
import { Zombie } from '../Zombie'

@Entity()
export abstract class Connection {
  @PrimaryColumn() id: string
}
