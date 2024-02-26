import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { assignRoles, fetchUserRoles } from '../../services/userRoleService';

const initialState = {
  userRoles: [],
  status: 'idle',
  result: '',
  error: 'null'
};

export const getUserRoles = createAsyncThunk( 'userRole/getUserRoles',
  async ( id ) => {
    const response = await fetchUserRoles( id );
    return response;
  } );

export const assignUserRoles = createAsyncThunk( 'userRole/assignUserRoles',
  async ( data ) => {
    const response = await assignRoles( data );
    return response;
  } );

export const userRoleSlice = createSlice( {
  name: 'userRole',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( getUserRoles.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( getUserRoles.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.userRoles = action.payload;
      } )
      .addCase( getUserRoles.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( assignUserRoles.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( assignUserRoles.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( assignUserRoles.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } );
  },
} );

export const useSelectUserRoles = ( state ) => state.userRole.userRoles;

export default userRoleSlice.reducer;
