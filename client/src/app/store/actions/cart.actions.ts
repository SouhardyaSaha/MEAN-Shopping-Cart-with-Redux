import { Action } from '@ngrx/store';
import { Cart, CartItem } from 'src/app/cart/cart.model';

export enum CartActionTypes {
  LOAD_CART = '[CART] Load Cart',
  LOAD_CART_SUCCESS = '[CART] Load Cart Success',
  LOAD_CART_FAILURE = '[CART] Load Cart Failure',

  ADD_ITEM = '[CART] Add Item',
  ADD_ITEM_SUCCESS = '[CART] Add Item Success',
  ADD_ITEM_FAILURE = '[CART] Add Item Failure',

  REMOVE_ITEM = '[CART] Remove Item',
  REMOVE_ITEM_SUCCESS = '[CART] Remove Item Success',
  REMOVE_ITEM_FAILURE = '[CART] Remove Item Failure',
}

export class LoadCartAction implements Action {
  readonly type = CartActionTypes.LOAD_CART;
}

export class LoadCartSuccessAction implements Action {
  readonly type = CartActionTypes.LOAD_CART_SUCCESS;

  constructor(public payload: CartItem[]) {}
}

export class LoadCartFailureAction implements Action {
  readonly type = CartActionTypes.LOAD_CART_FAILURE;

  constructor(public payload: Error) {}
}

export class AddItemAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM;

  constructor(public payload: CartItem) {}
}

export class AddItemSuccessAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM_SUCCESS;

  constructor(public payload: CartItem[]) {}
}

export class AddItemFailureAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM_FAILURE;

  constructor(public payload: Error) {}
}

export class RemoveItemAction implements Action {
  readonly type = CartActionTypes.REMOVE_ITEM;

  constructor(public payload: CartItem) {}
}

export class RemoveItemSuccessAction implements Action {
  readonly type = CartActionTypes.REMOVE_ITEM_SUCCESS;

  constructor(public payload: CartItem[]) {}
}

export class RemoveItemFailureAction implements Action {
  readonly type = CartActionTypes.REMOVE_ITEM_FAILURE;

  constructor(public payload: Error) {}
}

export type CartAction =
  | AddItemAction
  | AddItemSuccessAction
  | AddItemFailureAction
  | RemoveItemAction
  | RemoveItemSuccessAction
  | RemoveItemFailureAction
  | LoadCartAction
  | LoadCartFailureAction
  | LoadCartSuccessAction;
