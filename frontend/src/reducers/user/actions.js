import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  const { data } = await axios.post('/api/users/login', { email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

export const logout = createAsyncThunk('user/logout', async () => {
  const { data } = await axios.get('/api/users/logout');
  localStorage.setItem('userInfo', '');
  return data;
});
