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
const restoreShippingAddressFromStorage = () => {
  try {
    const itemsStr = localStorage.getItem('shippingAddress');
    return itemsStr ? JSON.parse(itemsStr) : {};
  } catch (err) {
    return {};
  }
};
const restorePaymentMethodFromStorage = () => {
  try {
    const itemsStr = localStorage.getItem('paymentMethod');
    return itemsStr ? JSON.parse(itemsStr) : '';
  } catch (err) {
    return '';
  }
};

const initialState = {
  cartItems: restoreCartItemsFromStorage(),
  shippingAddress: restoreShippingAddressFromStorage(),
  loading: false,
  paymentMethod: restorePaymentMethodFromStorage(),
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
    updateShippingAddress(state, action) {
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      state.shippingAddress = action.payload;
    },
    updatePaymentMethod(state, action) {
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      state.paymentMethod = action.payload;
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

export const { removeItem, updateShippingAddress, updatePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
