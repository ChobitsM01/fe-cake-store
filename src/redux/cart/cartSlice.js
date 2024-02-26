import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProductToCart, deleteProductInCart, fetchUserCarts } from '../../services/cartService';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: 'null',
  result: '',
  totalQuantity: 0,
  purchasedProducts: [],
  delRes: '',
  amount: 0,
  DT: ''

};

export const fetchCart = createAsyncThunk( 'cart/fetchCart',
  async ( id ) => {
    try {
      const response = await fetchUserCarts( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const addToCart = createAsyncThunk( 'cart/addToCart',
  async ( data ) => {
    const response = await addProductToCart( data );
    return response;
  } );

export const deleteAProductInCart = createAsyncThunk( 'cart/deleteAProductInCart',
  async ( data ) => {
    const response = await deleteProductInCart( data );
    return response;
  } );


export const cartSlice = createSlice( {
  name: 'cart',
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

      .addCase( fetchCart.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchCart.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.cartItems = action.payload.DT;
        state.totalQuantity = action.payload.DT.reduce( ( total, item ) => total + item.productQuantity, 0 );
      } )
      .addCase( fetchCart.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( deleteAProductInCart.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( deleteAProductInCart.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.delRes = action.payload;
      } )
      .addCase( deleteAProductInCart.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

  },
} );

export const { setPurchasedProducts, setAmount } = cartSlice.actions;
export const selectPurchasedProducts = ( state ) => state.cart.purchasedProducts;
export const selectAmount = ( state ) => state.cart.amount;
export const selectCartItem = ( state ) => state.cart.cartItems;
export const selectTotalQuantity = ( state ) => state.cart.totalQuantity;
export default cartSlice.reducer;
