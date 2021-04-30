import { Action } from '@ngrx/store';
import { Cart, CartItem } from 'src/app/cart/cart.model';

export enum CartActionTypes {
  LOAD_SHOPPING = '[SHOPPING] Load Cart',
  LOAD_SHOPPING_SUCCESS = '[SHOPPING] Load Cart Success',
  LOAD_SHOPPING_FAILURE = '[SHOPPING] Load Cart Failure',

  ADD_ITEM = '[SHOPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure',

  REMOVE_ITEM = '[SHOPPING] Remove Item',
  REMOVE_ITEM_SUCCESS = '[SHOPPING] Remove Item Success',
  REMOVE_ITEM_FAILURE = '[SHOPPING] Remove Item Failure',
}

export class LoadCartAction implements Action {
  readonly type = CartActionTypes.LOAD_SHOPPING;
}

export class LoadCartSuccessAction implements Action {
  readonly type = CartActionTypes.LOAD_SHOPPING_SUCCESS;
  constructor(public payload: Cart) {}
}

export class LoadCartFailureAction implements Action {
  readonly type = CartActionTypes.LOAD_SHOPPING_FAILURE;

  constructor(public payload: Error) {}
}

export class AddItemAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM;

  constructor(public payload: CartItem) {}
}

export class AddItemSuccessAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM_SUCCESS;

  constructor(public payload: CartItem) {}
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

  constructor(public payload: CartItem) {}
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
