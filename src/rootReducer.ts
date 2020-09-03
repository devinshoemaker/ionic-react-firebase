import { combineReducers } from 'redux';
import todoReducer from './todo/redux/todoReducers';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
