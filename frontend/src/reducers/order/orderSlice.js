import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions';

const initialState = {
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
        state.error = action.error.message;
      })

      .addDefaultCase((state, action) => {});
  },
});

export const { removeItem } = orderSlice.actions;
export default orderSlice.reducer;
