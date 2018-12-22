import { Field, InputType } from 'type-graphql'

@InputType()
export class MQTTConnectionsFilterInput {
  @Field({ nullable: true })
  address?: string
}
