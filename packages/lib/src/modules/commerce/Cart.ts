import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Base Cart' })
export class Cart {
  @Field()
  name!: string;
}
