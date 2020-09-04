import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../interfaces/todo';
import {
  deleteTodo,
  fetchTodosIfNeeded,
  postTodo,
} from '../redux/todoActions';
import { selectAllTodos } from "../redux/todoSelectors";

const TodoListPage = () => {
  const [showNewTodoAlert, setShowNewTodoAlert] = useState(false);
  const todos: Todo[] = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  dispatch(fetchTodosIfNeeded());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {todos.map((todo) => (
            <IonItem
              key={todo.id}
              onClick={() => {
                if (todo.id) {
                  dispatch(deleteTodo(todo.id));
                }
              }}
            >
              <IonLabel>{todo.content}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowNewTodoAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showNewTodoAlert}
          onDidDismiss={() => setShowNewTodoAlert(false)}
          header={'New Todo'}
          inputs={[
            {
              name: 'content',
              type: 'text',
            },
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Save',
              handler: (alertData) => {
                dispatch(postTodo({ content: alertData.content }));
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default TodoListPage;
