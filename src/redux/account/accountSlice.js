import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: {},
  isAuthenticated: false
};

export const accountSlice = createSlice( {
  name: 'account',
  initialState,
  reducers: {
    setUser: ( state, action ) => {
      state.account = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: ( state ) => {
      state.account = {};
      state.isAuthenticated = false;
    },
  },
} );

export const { setUser, clearUser } = accountSlice.actions;
export const selectUser = ( state ) => state.account;

export default accountSlice.reducer;
