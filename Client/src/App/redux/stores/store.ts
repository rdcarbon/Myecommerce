import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootreducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
//import {} from '../slices'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export default store;