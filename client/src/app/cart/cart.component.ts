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
  updatedCartItems: CartItem[] = [];
  cartItems$: Observable<CartItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  isUpdateButtonEnabled: boolean = false;

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

  private getItemIndex = (item: CartItem) => {
    for (let i = 0; i < this.updatedCartItems.length; i++) {
      if (
        this.updatedCartItems[i].size == item.size &&
        this.updatedCartItems[i].color == item.color &&
        this.updatedCartItems[i].product._id == item.product._id
      ) {
        return i;
      }
    }
    return -1;
  };

  onQuantityChange(cartItem: CartItem) {
    if (!this.isUpdateButtonEnabled)
      this.isUpdateButtonEnabled = !this.isUpdateButtonEnabled;

    // const index = this.getItemIndex(cartItem);
    // if (index === -1) this.updatedCartItems.push();
    console.log(cartItem.quantity);
  }

  onUpdateCart() {
    console.log('Update Cart');
  }
}
