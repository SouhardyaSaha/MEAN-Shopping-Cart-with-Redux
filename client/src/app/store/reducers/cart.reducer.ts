import { CartItem } from 'src/app/cart/cart.model';
import { CartActionTypes, CartAction } from '../actions/cart.actions';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: Error;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: undefined,
};

export function CartReducer(
  state: CartState = initialState,
  action: CartAction
) {
  switch (action.type) {
    case CartActionTypes.LOAD_CART:
      return {
        ...state,
        loading: true,
      };

    case CartActionTypes.LOAD_CART_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case CartActionTypes.LOAD_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        loading: true,
      };

    case CartActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case CartActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        loading: true,
      };

    case CartActionTypes.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case CartActionTypes.REMOVE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
