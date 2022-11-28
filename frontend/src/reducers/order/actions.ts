import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../models';

export const createOrder = createAsyncThunk('order/create', async (order: IOrder) => {
  const { data }: { data: IOrder } = await axios.post('/api/order', order);
  return data;
});

export const getOrder = createAsyncThunk('order/get', async (id: string) => {
  const { data }: { data: IOrder } = await axios.get(`/api/order/${id}`);
  return data;
});
