import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private baseURL = `${environment.serverURL}/users/cart`;
  constructor(private http: HttpClient) {}

  public getCartItems() {
    let url = `${this.baseURL}`;
    return this.http.get<any>(url).pipe(map((res) => res.body.cart));
  }

  public updateCartItem(cart: any) {
    let url = `${this.baseURL}`;
    return this.http.patch<any>(url, cart).pipe(map((res) => res.body.cart));
  }

  // public removeCartItem() {
  //   let url = `${this.baseURL}/users/cart`;

  // }
}
