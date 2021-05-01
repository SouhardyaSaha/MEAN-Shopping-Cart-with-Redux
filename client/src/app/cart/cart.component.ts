import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RemoveItemAction } from '../store/actions/cart.actions';
import { AppState } from '../store/models/app-state.model';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select((store) => store.cart.items);
    this.loading$ = this.store.select((store) => store.cart.loading);
    this.error$ = this.store.select((store) => store.cart.error);

    // this.store.dispatch(new LoadCartAction());
  }

  onRemoveItem(cartItem: CartItem) {
    this.store.dispatch(new RemoveItemAction(cartItem));
  }
}
