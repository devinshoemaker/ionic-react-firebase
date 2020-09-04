import Todo from '../interfaces/todo';

export interface TodoAction {
  type: string;
  payload: {
    todo?: Todo;
    todos?: Todo[];
  };
}

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

export const requestTodos = () => {
  return {
    type: 'todo/requestTodos',
  };
};

export const receiveTodos = (todos: Todo[]) => {
  return {
    type: 'todo/receiveTodos',
    payload: {
      todos,
    },
  };
};
