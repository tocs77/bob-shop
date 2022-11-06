import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from './actions';

const restoreCartItemsFromStorage = () => {
  try {
    const itemsStr = localStorage.getItem('cartItems');
    return itemsStr ? JSON.parse(itemsStr) : [];
  } catch (err) {
    return [];
  }
};

const initialState = {
  cartItems: restoreCartItemsFromStorage(),
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItem(state, action) {
      const id = action.payload;
      const newItems = state.cartItems.filter((i) => i.product !== id);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      state.cartItems = newItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const newItems = state.cartItems.filter((i) => i.product !== item.product);
        newItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        state.cartItems = newItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addDefaultCase((state, action) => {});
  },
});

export const { removeItem } = cartSlice.actions;
export default cartSlice.reducer;
