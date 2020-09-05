import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddlware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddlware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default store;
