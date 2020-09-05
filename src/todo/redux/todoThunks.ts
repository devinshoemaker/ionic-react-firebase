import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { firestore } from '../../firebase';
import { RootState } from '../../store';
import Todo from '../interfaces/todo';
import {
  addTodo,
  receiveTodos,
  removeTodo,
  requestTodos,
  TodoAction,
} from './todoActions';
import { TodoState } from './todoReducers';

const fetchTodos = () => async (dispatch: Dispatch) => {
  dispatch(requestTodos());
  const querySnapshot = await firestore.collection('todos').get();

  let todos: Todo[] = [];
  querySnapshot.forEach(function (doc) {
    todos.push({ ...(doc.data() as Todo), id: doc.id });
  });

  dispatch(receiveTodos(todos));
};
const shouldFetchTodos = (state: RootState) => {
  const todos = state.todos;

  if (!todos) {
    return true;
  } else if (todos.isFetching) {
    return false;
  } else {
    return todos.didInvalidate;
  }
};

export const fetchTodosIfNeeded = () => (
  dispatch: ThunkDispatch<TodoState, void, TodoAction>,
  getState: any
) => {
  if (shouldFetchTodos(getState())) {
    return dispatch(fetchTodos());
  }
};

export const postTodo = (todo: Todo) => async (dispatch: Dispatch) => {
  const docRef = await firestore.collection('todos').add(todo);

  dispatch(addTodo({ ...todo, id: docRef.id }));
};

export const deleteTodo = (id: string) => async (dispatch: Dispatch) => {
  await firestore.collection('todos').doc(id).delete();

  dispatch(removeTodo(id));
};
