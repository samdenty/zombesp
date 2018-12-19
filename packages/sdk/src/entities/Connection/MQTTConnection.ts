import { Connection } from './Connection'
import { Entity, Column } from 'typeorm'

@Entity()
export class MQTTConnection extends Connection {
  @Column() address: string

  @Column() port: number

  @Column({ nullable: true })
  username?: string

  @Column({ nullable: true })
  password?: string
}
