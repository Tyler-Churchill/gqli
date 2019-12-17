import { Model } from '../../core/objects/Model';
import { ModelField } from '../../core/objects/ModelField';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Base Cart' })
export class Cart {
  @Field()
  name!: string;
}
