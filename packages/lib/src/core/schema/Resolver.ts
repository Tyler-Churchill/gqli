import {
  ResolverClassOptions,
  ClassTypeResolver,
} from 'type-graphql/dist/decorators/types';
import { ClassType } from 'type-graphql';

export declare function Resolver(): ClassDecorator;
export declare function Resolver(options: ResolverClassOptions): ClassDecorator;
export declare function Resolver(
  typeFunc: ClassTypeResolver,
  options?: ResolverClassOptions,
): ClassDecorator;
export declare function Resolver(
  objectType: ClassType,
  options?: ResolverClassOptions,
): ClassDecorator;
