export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface IProduct {
  _id?: string;
  user?: string;
  name?: string;
  image?: string;
  brand?: string;
  category?: string;
  description?: string;
  rating: number;
  numReviews?: number;
  price?: number;
  countInStock: number;
  reviews?: IReview[];
}

export interface IShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface ICartProduct {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface IOrder {
  _id?: string;
  orderItems: ICartProduct[];
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}
