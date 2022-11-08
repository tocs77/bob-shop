import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './actions';

const restoreUserInfoFromStorage = () => {
  try {
    const infoStr = localStorage.getItem('userInfo');
    return infoStr ? JSON.parse(infoStr) : {};
  } catch (err) {
    return {};
  }
};

const initialState = {
  loading: false,
  error: null,
  userInfo: restoreUserInfoFromStorage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.log('act err', action.error);
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addDefaultCase((state, action) => {});
  },
});

export default userSlice.reducer;
