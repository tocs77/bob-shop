import { RootState } from '../../store';
export const cartItemsSelector = (store: RootState) => store.cart.cartItems;
export const shippingAddressSelector = (store: RootState) => store.cart.shippingAddress;
export const paymentMethodSelector = (store: RootState) => store.cart.paymentMethod;
