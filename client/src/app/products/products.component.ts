import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AddItemAction,
  LoadCartAction,
  RemoveItemAction,
} from '../store/actions/cart.actions';
import { AppState } from '../store/models/app-state.model';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  cartItems$: Observable<CartItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  // newCartItem: CartItem = {
  //   product: '123123',
  //   color: 'red',
  //   quantity: 1,
  //   size: 'large',
  // };

  constructor(
    private productService: ProductsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => console.log(res));
    // this.cartService.getCartItems().subscribe((res) => console.log(res));

    this.products$ = this.productService.getProducts();

    this.cartItems$ = this.store.select((store) => store.cart.items);
    this.loading$ = this.store.select((store) => store.cart.loading);
    this.error$ = this.store.select((store) => store.cart.error);

    this.store.dispatch(new LoadCartAction());
  }

  onAddItem(product: Product) {
    let cartItem: CartItem = {
      size: product.variants[0].size[0],
      quantity: product.variants[0].quantity,
      color: product.variants[0].color,
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
      },
    };
    this.store.dispatch(new AddItemAction(cartItem));
    // this.newCartItem.id = uuid();
    // this.newCartItem = { id: '', name: '' };
  }

  onRemoveItem(cartItem: CartItem) {
    this.store.dispatch(new RemoveItemAction(cartItem));
  }
}
