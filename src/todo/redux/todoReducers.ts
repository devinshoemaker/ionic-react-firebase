import Todo from '../interfaces/todo';
import { TodoAction } from './todoActions';

export interface TodoState {
  isFetching: boolean;
  didInvalidate: boolean;
  items: Todo[];
}

const initialState: TodoState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
};

function todoReducers(state = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'todo/addTodo':
      return {
        ...state,
        didInvalidate: true,
        items: action.payload.todo
          ? [...state.items, action.payload.todo]
          : [...state.items],
      };
    case 'todo/deleteTodo':
      return {
        ...state,
        didInvalidate: true,
        items: state.items.filter(
          (todo) => todo.id !== action.payload.todo?.id
        ),
      };
    case 'todo/requestTodos':
      return {
        ...state,
        isFetching: true,
      };
    case 'todo/receiveTodos':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.payload.todos ? action.payload.todos : [],
      };
    default:
      return state;
  }
}

export default todoReducers;
