import { CartState } from '../reducers/cart.reducer';

export interface AppState {
  readonly cart: CartState;
}
