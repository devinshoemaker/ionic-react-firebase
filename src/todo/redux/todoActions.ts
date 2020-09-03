import Todo from '../interfaces/todo';

export interface TodoAction {
  type: string;
  payload: Todo;
}
