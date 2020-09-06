import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { firestore } from '../../firebase';
import { RootState } from '../../store';
import Todo from '../interfaces/todo';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const querySnapshot = await firestore.collection('todos').get();

  let todos: Todo[] = [];
  querySnapshot.forEach(function (doc) {
    todos.push({ ...(doc.data() as Todo), id: doc.id });
  });

  return todos;
});

export const postTodo = createAsyncThunk(
  'todo/postTodo',
  async (todo: Todo) => {
    const docRef = await firestore.collection('todos').add(todo);

    return { ...todo, id: docRef.id };
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    await firestore.collection('todos').doc(id).delete();

    return id;
  }
);

const todoAdapter = createEntityAdapter<Todo>({});

export const { selectAll: selectAllTodos } = todoAdapter.getSelectors(
  (state: RootState) => state.todos
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: todoAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        if (state.status === 'loading') {
          todoAdapter.upsertMany(state, action);
          state.status = 'succeeded';
        }
      })
      .addCase(postTodo.fulfilled, todoAdapter.addOne)
      .addCase(deleteTodo.fulfilled, todoAdapter.removeOne);
  },
});

export default todoSlice.reducer;
