import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/products/productsSlice';

export const store = configureStore({
  reducer: { products: productsReducer },
});
