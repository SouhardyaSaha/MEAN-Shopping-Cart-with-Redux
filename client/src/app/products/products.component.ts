import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddItemAction, RemoveItemAction } from '../store/actions/cart.actions';
import { AppState } from '../store/models/app-state.model';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CartsService } from '../cart/carts.service';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  cartItems$: Observable<CartItem[]>;
  // newCartItem: CartItem = {
  //   product: '123123',
  //   color: 'red',
  //   quantity: 1,
  //   size: 'large',
  // };

  constructor(
    private productService: ProductsService,
    private cartService: CartsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => console.log(res));
    this.products$ = this.productService.getProducts();
    this.cartItems$ = this.store.select((store) => store.cart);
    // this.cartService.getCartItems().subscribe((res) => console.log(res));
  }

  onAddItem(product: Product) {
    let cartItem: CartItem = {
      size: product.variants[0].size[0],
      quantity: product.variants[0].quantity,
      color: product.variants[0].color,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    };
    // this.newCartItem.id = uuid();
    this.store.dispatch(new AddItemAction(cartItem));
    // this.newCartItem = { id: '', name: '' };
  }

  onRemoveItem(cartItem: CartItem) {
    this.store.dispatch(new RemoveItemAction(cartItem));
  }
}
