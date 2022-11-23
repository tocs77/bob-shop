import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductDetails } from './actions';

import { IProduct } from '../../models';

interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: null | string;
  product: IProduct;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  error: null,
  product: { reviews: [], rating: 0, countInStock: 0 },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addDefaultCase((state, action) => {});
  },
});

export default productsSlice.reducer;
