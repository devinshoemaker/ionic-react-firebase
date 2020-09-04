import { RootState } from '../../rootReducer';

export const selectAllTodos = (state: RootState) => state.todos.items;
