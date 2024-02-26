import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNewproduct, updateCurrentProduct, deleteAproduct, fetchProducts, fetchNewProduct, fetchAProduct, fetchProductsByCategory, filterProduct } from '../../services/productsService';

const initialState = {
  products: [],
  productsByCategory: [],
  status: 'idle',
  error: 'null',
  result: '',
  product: '',
  filRes: '',
  DT: ''
};

export const fetchProduct = createAsyncThunk( 'product/fetchProduct',
  async ( data ) => {
    try {
      const response = await fetchProducts( +data.currentPage, +data.currentLimit );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const getNewProduct = createAsyncThunk( 'product/getNewProduct',
  async () => {
    try {
      const response = await fetchNewProduct();
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const getAProduct = createAsyncThunk( 'product/getAProduct',
  async ( id ) => {
    try {
      const response = await fetchAProduct( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const searchProducts = createAsyncThunk( 'product/searchProducts',
  async ( name ) => {
    try {
      const response = await filterProduct( name );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );


export const getProductByCategory = createAsyncThunk( 'product/getProductByCategory',
  async ( id ) => {
    try {
      const response = await fetchProductsByCategory( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const createProduct = createAsyncThunk( 'product/createProduct',
  async ( productData ) => {
    try {
      const response = await createNewproduct( productData );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const updateProduct = createAsyncThunk( 'product/updateProduct',
  async ( productData ) => {
    try {
      const response = await updateCurrentProduct( productData );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const deleteProduct = createAsyncThunk( 'product/deleteProduct',
  async ( id ) => {
    try {
      const response = await deleteAproduct( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const productSlice = createSlice( {
  name: 'product',
  initialState,
  reducers: {
    // setProductFilter: ( state, action ) => {
    //   state.prodFil = action.payload;
    // },
  },
  extraReducers: ( builder ) => {
    builder
      //fetch product
      .addCase( fetchProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.DT = action.payload;
      } )
      .addCase( fetchProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //search product
      .addCase( searchProducts.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( searchProducts.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.filRes = action.payload;
      } )
      .addCase( searchProducts.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( getNewProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( getNewProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.DT = action.payload;
      } )
      .addCase( getNewProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( getAProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( getAProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.product = action.payload;
      } )
      .addCase( getAProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( getProductByCategory.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( getProductByCategory.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.productsByCategory = action.payload;
      } )
      .addCase( getProductByCategory.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Create Product
      .addCase( createProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( createProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( createProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Update Product
      .addCase( updateProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( updateProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( updateProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Delete Product
      .addCase( deleteProduct.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( deleteProduct.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( deleteProduct.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

  },
} );
export const selectProductByCategory = ( state ) => state.categories.productsByCategory;
export default productSlice.reducer;
