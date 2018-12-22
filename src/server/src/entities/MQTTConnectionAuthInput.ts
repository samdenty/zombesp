import { InputType, Field } from 'type-graphql'

@InputType()
export class MQTTConnectionAuthInput {
  @Field() username: string

  @Field({ nullable: true })
  password?: string
}
