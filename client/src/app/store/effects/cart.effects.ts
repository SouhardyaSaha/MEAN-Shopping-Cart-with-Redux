import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartsService } from 'src/app/cart/carts.service';
import {
  AddItemAction,
  AddItemFailureAction,
  AddItemSuccessAction,
  CartActionTypes,
  LoadCartAction,
  LoadCartFailureAction,
  LoadCartSuccessAction,
  RemoveItemAction,
  RemoveItemFailureAction,
  RemoveItemSuccessAction,
} from '../actions/cart.actions';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartsService: CartsService) {}

  @Effect() loadCart$ = this.actions$.pipe(
    ofType<LoadCartAction>(CartActionTypes.LOAD_CART),
    mergeMap(() =>
      this.cartsService.getCartItems().pipe(
        map((cartItems) => new LoadCartSuccessAction(cartItems)),
        catchError((error) => of(new LoadCartFailureAction(error)))
      )
    )
  );

  @Effect() addCartItem$ = this.actions$.pipe(
    ofType<AddItemAction>(CartActionTypes.ADD_ITEM),
    mergeMap((data) =>
      this.cartsService.addCartItem(data.payload).pipe(
        map((cartItems) => new AddItemSuccessAction(cartItems)),
        catchError((error) => of(new AddItemFailureAction(error)))
      )
    )
  );

  @Effect() removeCartItem$ = this.actions$.pipe(
    ofType<RemoveItemAction>(CartActionTypes.REMOVE_ITEM),
    mergeMap((data) =>
      this.cartsService.removeCartItem(data.payload).pipe(
        map((cartItems) => new RemoveItemSuccessAction(cartItems)),
        catchError((error) => of(new RemoveItemFailureAction(error)))
      )
    )
  );
}
