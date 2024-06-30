import { combineReducers } from '@reduxjs/toolkit';
import {counterReducer} from './slices/counterSlice';
import { basketReducer } from '../features/Basket/basketSlice';
import { catalogSlice } from '../features/Catalog/CatalogSlice';
import { accountSlice } from '../features/Account/AccountSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  basket:basketReducer,
  catalog:catalogSlice.reducer,
  account:accountSlice.reducer
});

export default rootReducer;