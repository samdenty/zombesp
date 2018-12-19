import {
  PrimaryGeneratedColumn,
  ManyToMany,
  Entity,
  PrimaryColumn,
} from 'typeorm'
import { Zombie } from '../Zombie'

@Entity()
export abstract class Connection {
  @PrimaryColumn() id: string

  @ManyToMany(type => Zombie, zombie => zombie.connections)
  zombies: Zombie[]
}
