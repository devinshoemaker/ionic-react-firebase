import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTodos } from '../redux/todoActions';

const TodoListPage = () => {
  const todos = useSelector(selectAllTodos);

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
            <IonItem>
              <IonLabel>{todo.content}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TodoListPage;
