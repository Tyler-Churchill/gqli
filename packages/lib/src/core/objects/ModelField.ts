import {
  MethodAndPropDecorator,
  AdvancedOptions,
  ReturnTypeFunc,
} from 'type-graphql/dist/decorators/types';

export declare function ModelField(): MethodAndPropDecorator;
export declare function ModelField(
  options: AdvancedOptions,
): MethodAndPropDecorator;
export declare function ModelField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: AdvancedOptions,
): MethodAndPropDecorator;
