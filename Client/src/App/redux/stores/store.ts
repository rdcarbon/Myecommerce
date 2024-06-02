import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootreducer';
//import {} from '../slices'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;