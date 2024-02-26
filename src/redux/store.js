import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import userReducer from '../redux/user/userSlice';
import groupReducer from '../redux/userGroup/userGroupSlice';
import productReducer from '../redux/products/productSlice';
import caregoriesReducer from './categories/categoriesSlice';
import accountReducer from './account/accountSlice';
import persistConfig from './persistConfig';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './cart/cartSlice';
import roleReducer from './role/roleSlice';
import userRoleReducer from './userRole/userRoleSlice';

const rootReducer = combineReducers( {
  counter: counterReducer,
  users: userReducer,
  groups: groupReducer,
  product: productReducer,
  categories: caregoriesReducer,
  account: accountReducer,
  cart: cartReducer,
  role: roleReducer,
  userRole: userRoleReducer
} );

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = configureStore( {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware( {
      serializableCheck: false,
    } ),
} );

export const persistor = persistStore( store );