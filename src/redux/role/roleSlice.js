import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllRoles } from '../../services/roleService';

const initialState = {
  roles: [],
  status: 'idle',
  error: 'null'
};

export const fetchRoles = createAsyncThunk( 'role/fetchRoles',
  async () => {
    const response = await fetchAllRoles();
    return response;
  } );

export const roleSlice = createSlice( {
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchRoles.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchRoles.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.roles = action.payload;
      } )
      .addCase( fetchRoles.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } );
  },
} );

export const useSelectRole = ( state ) => state.role.roles.DT;

export default roleSlice.reducer;
