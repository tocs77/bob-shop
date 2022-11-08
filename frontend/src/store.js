import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/products/productsSlice';
import cartReducer from './reducers/cart/cartSlice';
import userReducer from './reducers/user/userSlice';

export const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer, user: userReducer },
});
