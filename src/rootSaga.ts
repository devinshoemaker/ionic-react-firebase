import { all } from 'redux-saga/effects';
import todoSagas from './todo/redux/todoSagas';

function* rootSaga() {
  yield all([todoSagas()]);
}

export default rootSaga;
