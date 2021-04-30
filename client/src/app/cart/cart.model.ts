export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  color: string;
  size: string;
}

export interface Cart {
  items: CartItem[];
}
