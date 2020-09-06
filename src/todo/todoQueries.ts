import { useQuery, useMutation, queryCache } from 'react-query';
import Todo from './interfaces/todo';
import { firestore } from '../firebase';

export const useSelectAllTodos = () => {
  return useQuery<Todo[]>('todos', async () => {
    const querySnapshot = await firestore.collection('todos').get();

    let todos: Todo[] = [];
    querySnapshot.forEach(function (doc) {
      todos.push({ ...(doc.data() as Todo), id: doc.id });
    });

    return todos;
  });
};

export const usePostTodo = () => {
  return useMutation(
    async (todo: Todo) => await firestore.collection('todos').add(todo),
    {
      onSuccess: () => {
        queryCache.invalidateQueries('todos');
      },
    }
  );
};

export const useDeleteTodo = () => {
  return useMutation(
    async (id: string) => await firestore.collection('todos').doc(id).delete(),
    {
      onSuccess: () => {
        queryCache.invalidateQueries('todos');
      },
    }
  );
};
