import { combineReducers } from 'redux';
import todoReducers from './todo/redux/todoReducers';

const rootReducer = combineReducers({
  todos: todoReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
