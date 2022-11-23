import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk('order/create', async (order) => {
  const { data } = await axios.post('/api/order', order);
  return data;
});
