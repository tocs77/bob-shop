import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeItem } from './cartSlice';

export const addToCart = createAsyncThunk('products/addToCart', async ({ id, qty }) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return { product: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty: qty };
});

export { removeItem };
