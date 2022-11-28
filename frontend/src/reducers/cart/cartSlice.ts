import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCart } from './actions';

import { ICartProduct, IShippingAddress } from '../../models';

const restoreCartItemsFromStorage = (): ICartProduct[] => {
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
const restorePaymentMethodFromStorage = (): string => {
  try {
    const itemsStr = localStorage.getItem('paymentMethod');
    return itemsStr ? JSON.parse(itemsStr) : '';
  } catch (err) {
    return '';
  }
};

interface ICartState {
  cartItems: ICartProduct[];
  shippingAddress: IShippingAddress;
  loading: boolean;
  paymentMethod: string;
  error: null | string;
}

const initialState: ICartState = {
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
    removeItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const newItems = state.cartItems.filter((i) => i.product !== id);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      state.cartItems = newItems;
    },
    updateShippingAddress(state, action: PayloadAction<IShippingAddress>) {
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      state.shippingAddress = action.payload;
    },
    updatePaymentMethod(state, action: PayloadAction<string>) {
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<ICartProduct>) => {
        state.loading = false;
        const item = action.payload;
        const newItems = state.cartItems.filter((i) => i.product !== item.product);
        newItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        state.cartItems = newItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addDefaultCase((state, action) => {});
  },
});

export const { removeItem, updateShippingAddress, updatePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
