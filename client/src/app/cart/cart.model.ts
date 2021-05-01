export interface CartItem {
  product: {
    _id: string;
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

export interface CartResponseData {
  _id: string;
  user: string;
  body: {
    cart: {
      items: CartItem[];
    };
  };
}
