export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  name: string;
  email: string;
  address: string;
  city: string;
}

export interface CardInfo {
  cardName: string;
  cardNumber: string;
  cvc: string;
  expiry: string;
}

export interface CheckoutPayload {
  address: Address;
  card: CardInfo;
  items: CartItem[];
  totalAmount: number;
}
