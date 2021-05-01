import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  selectedColor: string;
  selectedSize: string;
  selectedQuantity: number = 1;
  maxQuantity: number = 1;
  colors: string[] = [];
  sizes: string[] = [];

  ngOnInit(): void {
    this.product.variants.forEach((item) => {
      this.colors.push(item.color);
    });
  }

  onColorSelect() {
    if (this.selectedColor) {
      this.product.variants.forEach((item) => {
        if (item.color === this.selectedColor) {
          this.sizes = item.size;
          this.maxQuantity = item.quantity;
          this.selectedQuantity = 1;
        }
      });
    }
  }

  onAddItem() {
    let cartItem: CartItem = {
      size: this.selectedSize,
      quantity: this.selectedQuantity,
      color: this.selectedColor,
      product: {
        _id: this.product._id,
        name: this.product.name,
        price: this.product.price,
      },
    };
    this.store.dispatch(new AddItemAction(cartItem));
    // this.newCartItem.id = uuid();
    // this.newCartItem = { id: '', name: '' };
  }
}
