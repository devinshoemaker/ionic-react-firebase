import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/redux/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
