import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/products/productsSlice';
import cartReducer from './reducers/cart/cartSlice';
import userReducer from './reducers/user/userSlice';
import orderReducer from './reducers/order/orderSlice';

export const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer, user: userReducer, order: orderReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
