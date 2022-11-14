import { createSlice } from '@reduxjs/toolkit';
import { login, register, updateDetails } from './actions';

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
  reducers: {
    logout(state) {
      state.userInfo = {};
      localStorage.setItem('userInfo', '');
    },
  },
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
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addDefaultCase((state, action) => {});
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
