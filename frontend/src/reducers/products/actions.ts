import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IProduct } from '../../models';
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const { data }: { data: IProduct[] } = await axios.get('/api/products');
  return data;
});

export const getProductDetails = createAsyncThunk('products/getProductDetails', async (id: string) => {
  const { data }: { data: IProduct } = await axios.get(`/api/products/${id}`);
  return data;
});
