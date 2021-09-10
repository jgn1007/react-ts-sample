/**
 * *************************************************
 * sagasのまとめ
 *
 * *************************************************
 */
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { addTodo } from '../actions/todo';
import { sagaAddTodo } from './todo_saga';


export default function* rootSaga() {
  yield takeLatest(addTodo.started, sagaAddTodo);
}
