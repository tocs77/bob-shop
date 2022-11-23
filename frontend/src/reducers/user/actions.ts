import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './userSlice';
import { IUser } from '../../models';

export interface IUserCredentials {
  name?: string;
  email: string;
  password?: string;
}

export const login = createAsyncThunk('user/login', async ({ email, password }: IUserCredentials) => {
  const { data }: { data: IUser } = await axios.post('/api/users/login', { email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

export const register = createAsyncThunk('user/register', async ({ name, email, password }: IUserCredentials) => {
  const { data }: { data: IUser } = await axios.post('/api/users', { name, email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

export const getDetails = createAsyncThunk('user/profile', async () => {
  const { data } = await axios.get('/api/users/profile');
  return data;
});

export const updateDetails = createAsyncThunk('user/updateProfile', async ({ name, email, password }: IUserCredentials) => {
  const { data }: { data: IUser } = await axios.put('/api/users/', { email, name, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

export { logout };
