import { configureStore } from '@reduxjs/toolkit';
import todoReducer from 'app/slice/todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;