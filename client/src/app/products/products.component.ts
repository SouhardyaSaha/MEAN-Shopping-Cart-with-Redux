import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
