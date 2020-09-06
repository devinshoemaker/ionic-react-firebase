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
import { useDeleteTodo, usePostTodo, useSelectAllTodos } from '../todoQueries';

const TodoListPage = () => {
  const [showNewTodoAlert, setShowNewTodoAlert] = useState(false);
  const { data: todos } = useSelectAllTodos();
  const [addTodo] = usePostTodo();
  const [deleteTodo] = useDeleteTodo();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {todos ? (
          <IonList>
            {todos.map((todo) => (
              <IonItem
                key={todo.id}
                onClick={() => {
                  if (todo.id) {
                    deleteTodo(todo.id);
                  }
                }}
              >
                <IonLabel>{todo.content}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          ''
        )}

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
                addTodo({ content: alertData.content });
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default TodoListPage;
