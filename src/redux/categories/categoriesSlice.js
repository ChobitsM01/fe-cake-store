import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategoryData, createNewCategory, fetchListCategories, updateCurrentCategory, deleteACategory } from '../../services/categoriesService';

const initialState = {
  categories: [],
  status: 'idle',
  error: 'null',
  result: '',
  DT: ''

};

export const fetchCategories = createAsyncThunk( 'categories/fetchCategories',
  async ( data ) => {
    try {
      if ( data ) {
        const response = await fetchListCategories( +data.currentPage, +data.currentLimit );
        return response.DT;
      } else {
        const response = await fetchListCategories();
        return response;
      }
    } catch ( error ) {
      throw error;
    }
  } );

export const fetchAllCategories = createAsyncThunk( 'categories/fetchAllCategories',
  async () => {
    try {
      const response = await fetchAllCategoryData();
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const createACategory = createAsyncThunk( 'categories/createACategory',
  async ( name ) => {
    try {
      const response = await createNewCategory( name );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const updateCategory = createAsyncThunk( 'categories/updateCategory',
  async ( productData ) => {
    try {
      const response = await updateCurrentCategory( productData );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const deleteCategory = createAsyncThunk( 'categories/deleteCategory',
  async ( id ) => {
    try {
      const response = await deleteACategory( id );
      return response;
    } catch ( error ) {
      throw error;
    }
  } );

export const categoriesSlice = createSlice( {
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      //fetch product
      .addCase( fetchCategories.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchCategories.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.DT = action.payload;
      } )
      .addCase( fetchCategories.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      .addCase( fetchAllCategories.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( fetchAllCategories.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( fetchAllCategories.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Create Product
      .addCase( createACategory.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( createACategory.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( createACategory.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Update Product
      .addCase( updateCategory.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( updateCategory.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( updateCategory.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

      //Delete Product
      .addCase( deleteCategory.pending, ( state ) => {
        state.status = 'Fired';
      } )
      .addCase( deleteCategory.fulfilled, ( state, action ) => {
        state.status = 'Succeeded';
        state.result = action.payload;
      } )
      .addCase( deleteCategory.rejected, ( state, action ) => {
        state.status = 'Failed';
        state.error = action.error.message;
      } )

  },
} );

export default categoriesSlice.reducer;
