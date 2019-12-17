//import { Resolver } from '../../core/schema/Resolver';
import { Query, Resolver } from 'type-graphql';
import { Cart } from './Cart';

@Resolver()
export class CartResolver {
  @Query(returns => [Cart])
  async carts() {
    return [{ name: 'test' }];
  }
}
