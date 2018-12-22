import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class DirectConnectionsFilterInput {
  @Field(type => ID, { nullable: true })
  zombieId?: string
}
