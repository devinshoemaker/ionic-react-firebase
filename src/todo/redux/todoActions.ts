import Todo from '../interfaces/todo';
import { RootState } from '../../rootReducer';

export interface TodoAction {
  type: string;
  payload: Todo;
}

export const selectAllTodos = (state: RootState) => state.todos;
