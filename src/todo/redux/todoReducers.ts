import Todo from '../interfaces/todo';
import { TodoAction } from './todoActions';

const initialState: Todo[] = [
  {
    id: 1,
    content: 'First todo',
  },
  {
    id: 2,
    content: 'Second todo',
  },
];

function todoReducer(state = initialState, action: TodoAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default todoReducer;
