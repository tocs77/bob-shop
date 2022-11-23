import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions';

import { IOrder } from '../../models';

interface IOrderState {
  loading: boolean;
  error: boolean | string;
  order: null | IOrder;
}

const initialState: IOrderState = {
  loading: false,
  error: false,
  order: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeItem(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || false;
      })

      .addDefaultCase((state, action) => {});
  },
});

export const { removeItem } = orderSlice.actions;
export default orderSlice.reducer;
