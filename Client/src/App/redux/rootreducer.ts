import { combineReducers } from '@reduxjs/toolkit';
import {counterReducer} from './slices/counterSlice';
import { basketReducer } from '../features/Basket/basketSlice';
import { catalogSlice } from '../features/Catalog/CatalogSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  basket:basketReducer,
  catalog:catalogSlice.reducer
});

export default rootReducer;