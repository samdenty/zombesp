import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { InterfaceType, Field } from 'type-graphql'

@InterfaceType()
@Entity()
export abstract class Connection {
  @Field()
  @PrimaryGeneratedColumn()
  id: number
}
