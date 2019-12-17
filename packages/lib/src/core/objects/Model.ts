import { ObjectOptions } from 'type-graphql/dist/decorators/ObjectType';

export declare function Model(): ClassDecorator;
export declare function Model(options: ObjectOptions): ClassDecorator;
export declare function Model(
  name: string,
  options?: ObjectOptions,
): ClassDecorator;
