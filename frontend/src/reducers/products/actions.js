import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const { data } = await axios.get('/api/products');
  return data;
});
