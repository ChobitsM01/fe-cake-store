// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { addProductToCart, deleteProductInCart, fetchUserCarts } from '../../services/cartService';

// const initialState = {
//   cartItems: [],
//   status: 'idle',
//   error: 'null',
//   totalQuantity: 0,
//   result: ''
// };

// export const getUserCart2 = createAsyncThunk( 'cart/getUserCart2',
//   async ( id ) => {
//     try {
//       const response = await fetchUserCarts( id );
//       return response;
//     } catch ( error ) {
//       throw error;
//     }
//   } );
// export const addToCart = createAsyncThunk( 'cart/addToCart',
//   async ( data ) => {
//     const response = await addProductToCart( data );
//     return response;
//   } );

// export const deleteCartItem = createAsyncThunk( 'cart/deleteCartItem',
//   async ( id ) => {
//     const response = await deleteProductInCart( id );
//     return response;
//   } );

// export const cartSlice = createSlice( {
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: ( builder ) => {
//     builder
//       //read
//       .addCase( getUserCart2.pending, ( state ) => {
//         state.status = 'Fired';
//       } )
//       .addCase( getUserCart2.fulfilled, ( state, action ) => {
//         state.status = 'Succeeded';
//         state.result = action.payload;
//         // state.totalQuantity = action.payload.DT.reduce( ( total, item ) => total + item.productQuantity, 0 );
//       } )
//       .addCase( getUserCart2.rejected, ( state, action ) => {
//         state.status = 'Failed';
//         state.error = action.error.message;
//       } )

//     //create
//     // .addCase( addToCart.pending, ( state ) => {
//     //   state.status = 'Fired';
//     // } )
//     // .addCase( addToCart.fulfilled, ( state, action ) => {
//     //   state.status = 'Succeeded';
//     //   state.result = action.payload;
//     // } )
//     // .addCase( addToCart.rejected, ( state, action ) => {
//     //   state.status = 'Failed';
//     //   state.error = action.error.message;
//     // } )

//     //delete
//     // .addCase( deleteCartItem.pending, ( state ) => {
//     //   state.status = 'Fired';
//     // } )
//     // .addCase( deleteCartItem.fulfilled, ( state, action ) => {
//     //   state.status = 'Succeeded';
//     //   state.result = action.payload;
//     // } )
//     // .addCase( deleteCartItem.rejected, ( state, action ) => {
//     //   state.status = 'Failed';
//     //   state.error = action.error.message;
//     // } );
//   },
// } );

// // export const selectCartRes = ( state ) => state.result;
// // export const selectCartItem = ( state ) => state.cart.cartItems;
// // export const selectTotalQuantity = ( state ) => state.cart.totalQuantity;
// export default cartSlice.reducer;
