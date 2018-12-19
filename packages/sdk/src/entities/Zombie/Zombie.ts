import {
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from 'typeorm'
import { Connection } from '../Connection'

@Entity('zombies')
export class Zombie {
  @PrimaryColumn() id: string

  @ManyToMany(type => Connection, connection => connection.zombies)
  @JoinTable()
  connections: Connection[]
}
