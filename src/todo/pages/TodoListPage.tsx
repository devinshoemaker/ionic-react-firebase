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
import { addTodo, deleteTodo, selectAllTodos } from '../redux/todoActions';

const TodoListPage = () => {
  const [showNewTodoAlert, setShowNewTodoAlert] = useState(false);
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

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
              onClick={() => dispatch(deleteTodo(todo.id))}
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
                dispatch(addTodo(alertData.content));
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default TodoListPage;
