import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { firestore } from '../../firebase';
import { RootState } from '../../rootReducer';
import Todo from '../interfaces/todo';
import { TodoState } from './todoReducers';

export interface TodoAction {
  type: string;
  payload: {
    todo?: Todo;
    todos?: Todo[];
  };
}

export const selectAllTodos = (state: RootState) => state.todos.items;

export const addTodo = (todo: Todo) => {
  return {
    type: 'todo/addTodo',
    payload: {
      todo,
    },
  };
};

export const removeTodo = (id: string | undefined) => {
  return {
    type: 'todo/deleteTodo',
    payload: {
      todo: { id },
    },
  };
};

const requestTodos = () => {
  return {
    type: 'todo/requestTodos',
  };
};

const receiveTodos = (todos: Todo[]) => {
  return {
    type: 'todo/receiveTodos',
    payload: {
      todos,
    },
  };
};

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
