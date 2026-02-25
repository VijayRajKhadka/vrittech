interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  count: number;
}

interface CartState {
  items: CartItem[];
}
