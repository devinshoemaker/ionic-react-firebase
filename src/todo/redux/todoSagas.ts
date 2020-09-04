import { all, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { firestore } from '../../firebase';
import Todo from '../interfaces/todo';
import {
  addTodo,
  receiveTodos,
  requestTodos,
  TodoAction,
  removeTodo,
} from './todoActions';
import { TodoState } from './todoReducers';

function* fetchTodos() {
  yield put(requestTodos());
  const querySnapshot = yield firestore.collection('todos').get();

  let todos: Todo[] = [];
  querySnapshot.forEach(function (doc: any) {
    todos.push({ ...(doc.data() as Todo), id: doc.id });
  });

  yield put(receiveTodos(todos));
}

const shouldFetchTodos = (todoState: TodoState) => {
  return true;
};

function* fetchTodosIfNeeded() {
  const todoState = yield select((state) => state.todos);
  if (shouldFetchTodos(todoState)) {
    yield* fetchTodos();
  }
}

function* watchFetchTodos() {
  yield takeLatest('todo/fetchTodos', fetchTodosIfNeeded);
}

function* postTodo(action: TodoAction) {
  if (action.payload.todo) {
    const docRef = yield firestore.collection('todos').add(action.payload.todo);

    yield put(addTodo({ ...action.payload.todo, id: docRef.id }));
  }
}

function* watchPostTodo() {
  yield takeEvery('todo/postTodo', postTodo);
}

function* deleteTodo(action: TodoAction) {
  if (action.payload.todo) {
    yield firestore.collection('todos').doc(action.payload.todo.id).delete();

    yield put(removeTodo(action.payload.todo.id));
  }
}

function* watchDeleteTodo() {
  yield takeEvery('todo/deleteTodo', deleteTodo);
}

function* todoSagas() {
  yield all([watchFetchTodos(), watchPostTodo(), watchDeleteTodo()]);
}

export default todoSagas;
