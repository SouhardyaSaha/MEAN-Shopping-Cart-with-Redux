import { CartItem } from 'src/app/cart/cart.model';

export interface AppState {
  readonly cart: CartItem[];
}
