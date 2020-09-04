import { RootState } from '../../rootReducer';
import Todo from '../interfaces/todo';

export interface TodoAction {
  type: string;
  payload: Todo;
}

export const selectAllTodos = (state: RootState) => state.todos;

let nextTodoId = 0;
export const addTodo = (content: string) => {
  return {
    type: 'todo/addTodo',
    payload: {
      id: nextTodoId++,
      content,
    },
  };
};

export const deleteTodo = (id: number) => {
  return {
    type: 'todo/deleteTodo',
    payload: {
      id,
    },
  };
};
