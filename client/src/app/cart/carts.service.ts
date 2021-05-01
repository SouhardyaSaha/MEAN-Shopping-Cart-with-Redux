import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartItem, CartResponseData } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private baseURL = `${environment.serverURL}/users/cart`;
  constructor(private http: HttpClient) {}

  public getCartItems() {
    let url = `${this.baseURL}`;
    return this.http
      .get<CartResponseData>(url)
      .pipe(map((res) => res.body.cart.items));
  }

  public addCartItem(cartItem: CartItem) {
    let url = `${this.baseURL}/add`;
    return this.http
      .patch<CartResponseData>(url, cartItem)
      .pipe(map((res) => res.body.cart.items));
  }

  public removeCartItem(cartItem: CartItem) {
    let url = `${this.baseURL}/remove`;
    return this.http
      .patch<CartResponseData>(url, cartItem)
      .pipe(map((res) => res.body.cart.items));
  }
}
