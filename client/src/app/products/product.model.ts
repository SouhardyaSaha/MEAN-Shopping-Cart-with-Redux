interface Variant {
  color: string;
  quantity: number;
  size: string[];
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  available: boolean;
  variants: Variant[];
}

export interface ProductsResponse {
  success: boolean;
  body: { products: Product[] };
}
