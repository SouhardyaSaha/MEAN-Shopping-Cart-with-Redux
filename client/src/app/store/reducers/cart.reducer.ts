import { CartItem } from 'src/app/cart/cart.model';
import { CartActionTypes, CartAction } from '../actions/cart.actions';

const initialState: CartItem[] = [
  {
    product: {
      id: '123123',
      name: 'T-Shirt',
      price: 500,
    },
    color: 'white',
    quantity: 2,
    size: 'large',
  },
];

export function CartReducer(
  state: CartItem[] = initialState,
  action: CartAction
) {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return [...state, action.payload];

    case CartActionTypes.REMOVE_ITEM:
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
}
