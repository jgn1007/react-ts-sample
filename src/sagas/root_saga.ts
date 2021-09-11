/**
 * *************************************************
 * sagasのまとめ
 *
 * *************************************************
 */
import { takeLatest, takeEvery, all, fork } from 'redux-saga/effects'
import { addTodo } from '../actions/todo_action';
import todoSaga from './todo_saga';


export default function* rootSaga() {
  yield all([fork(todoSaga)]);
}
