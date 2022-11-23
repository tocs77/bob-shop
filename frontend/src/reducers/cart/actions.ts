import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeItem } from './cartSlice';
import { ICartProduct } from '../../models';

export const addToCart = createAsyncThunk('products/addToCart', async ({ id, qty }: { id: string; qty: number }) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const p: ICartProduct = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty: qty,
  };
  return p;
});

export { removeItem };
