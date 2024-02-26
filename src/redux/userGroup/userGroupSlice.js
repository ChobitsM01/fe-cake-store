import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios.customize';

const initialState = {
  userGroup: [],
  status: 'idle',
  error: 'null'
};

export const fetchGroup = createAsyncThunk( 'groups/fetchGroup',
  async () => {
    const response = await axios.get( '/api/v1/groups/read' );
    return response.DT;
  } );

export const userGroupSlice = createSlice( {
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchGroup.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchGroup.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.userGroup = action.payload;
      } )
      .addCase( fetchGroup.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } );
  },
} );

export const useSelectUserGroup = ( state ) => state.groups.userGroup;

export default userGroupSlice.reducer;
