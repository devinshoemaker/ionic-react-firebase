import Todo from '../interfaces/todo';
import { TodoAction } from './todoActions';

const initialState: Todo[] = [];

function todoReducers(state = initialState, action: TodoAction) {
  switch (action.type) {
    case 'todo/addTodo':
      return [...state, action.payload];
    default:
      return state;
  }
}

export default todoReducers;
