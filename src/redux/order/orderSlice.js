import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, destroyAnOrder, fetchOrders, updateAnOrder } from '../../services/orderService';

const initialState = {
  status: 'idle',
  error: 'null',
  result: '',
  DT: '',
  orderRes: '',
  delRes: '',
  upRes: '',
};

export const createAnOrder = createAsyncThunk( 'order/createAnOrder',
  async ( data ) => {
    try {
      const response = await createOrder( data );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const getOrders = createAsyncThunk( 'order/getOrders',
  async ( data ) => {
    try {
      const response = await fetchOrders( data.page, data.limit );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const update = createAsyncThunk( 'order/update',
  async ( orderData ) => {
    try {
      const response = await updateAnOrder( orderData );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const destroyOrder = createAsyncThunk( 'order/destroyOrder',
  async ( id ) => {
    try {
      const response = await destroyAnOrder( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const orderSlice = createSlice( {
  name: 'order',
  initialState,
  reducers: {
    setPurchasedProducts: ( state, action ) => {
      state.purchasedProducts = action.payload;
    },
    setAmount: ( state, action ) => {
      state.amount = action.payload;
    },
  },
  extraReducers: ( builder ) => {
    builder

      //read
      .addCase( getOrders.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( getOrders.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.orderRes = action.payload;
      } )
      .addCase( getOrders.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //create
      .addCase( createAnOrder.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( createAnOrder.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload.DT;
      } )
      .addCase( createAnOrder.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //update
      .addCase( update.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( update.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.upRes = action.payload;
      } )
      .addCase( update.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //delete
      .addCase( destroyOrder.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( destroyOrder.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.delRes = action.payload.DT;
      } )
      .addCase( destroyOrder.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

  },
} );

export default orderSlice.reducer;
