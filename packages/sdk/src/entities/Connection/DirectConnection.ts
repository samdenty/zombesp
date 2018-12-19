import { Connection } from './Connection'
import { Entity, Column } from 'typeorm'

@Entity()
export class DirectConnection extends Connection {
  @Column() address: string

  @Column() port: number
}
