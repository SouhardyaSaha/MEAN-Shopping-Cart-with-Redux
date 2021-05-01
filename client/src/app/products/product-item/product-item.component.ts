import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/cart/cart.model';
import { AddItemAction } from 'src/app/store/actions/cart.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log(this.product);
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
}
