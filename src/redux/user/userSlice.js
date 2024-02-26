import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, createNewUser, deleteAUser, updateCurrentUser } from '../../services/userService';

const initialState = {
  listUsers: [],
  status: 'idle',
  error: 'null',
  result: '',
  updateRes: '',
  DT: ''
};

export const fetchUsers = createAsyncThunk( 'users/fetchUsers',
  async ( data ) => {
    try {
      const response = await fetchAllUsers( +data.currentPage, +data.currentLimit );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const createAUser = createAsyncThunk( 'users/createAUser',
  async ( userdata ) => {
    try {
      const response = await createNewUser( userdata );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const updateUser = createAsyncThunk( 'users/updateUser',
  async ( userdata ) => {
    try {
      const response = await updateCurrentUser( userdata );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const deleteUser = createAsyncThunk( 'users/deleteUser',
  async ( id ) => {
    try {
      const response = await deleteAUser( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const userSlice = createSlice( {
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      //Fetch account
      .addCase( fetchUsers.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchUsers.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.DT = action.payload;
      } )
      .addCase( fetchUsers.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Create A User
      .addCase( createAUser.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( createAUser.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( createAUser.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Update Current User
      .addCase( updateUser.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( updateUser.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.updateRes = action.payload;
      } )
      .addCase( updateUser.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Delete A User
      .addCase( deleteUser.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( deleteUser.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( deleteUser.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )
  },
} );

export default userSlice.reducer;
