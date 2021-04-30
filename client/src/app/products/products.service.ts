import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from './product.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = environment.serverURL;
  constructor(private http: HttpClient) {}

  public getProducts() {
    let url = `${this.baseURL}/products`;
    return this.http
      .get<ProductsResponse>(url)
      .pipe(map((res) => res.body.products));
  }
}
