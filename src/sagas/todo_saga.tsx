import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AnyAction } from 'redux';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import fetchWrap from '../utils/fetch_wrap';
import { addTodo, deleteTodo, getTodo, updateDoneTodo } from '../actions/todo_action';


export function* sagaAddTodo(context: any) {
  try {
    yield call(fetchWrap, "todo_list", { data: { text: context.payload, done: false }, method: "POST" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(addTodo.done({ result: payload, params: context }));
  } catch (e) {
    yield put(addTodo.failed({
      params: context,
      error: new Error("")
    }))
  }
}

export function* sagaDeleteTodo(context: any) {
  try {
    yield call(fetchWrap, `todo_list/${context.payload}`, { method: "DELETE" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(deleteTodo.done({ result: payload, params: context }));
  } catch (e) {
    yield put(deleteTodo.failed({
      params: context,
      error: new Error("")
    }))
  }
}

export function* sagaUpdateDoneTodo(context: any) {
  try {
    yield call(fetchWrap, `todo_list/${context.payload.id}`, { method: "PATCH", data: { done: context.payload.done } });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(updateDoneTodo.done({ result: payload, params: context }));
  } catch (e) {
    yield put(updateDoneTodo.failed({
      params: context,
      error: new Error("")
    }))
  }
}

export function* sagaGetTodos(context: any) {
  try {
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(getTodo.done({ result: payload, params: context }));
  } catch (e) {
    yield put(getTodo.failed({
      params: context,
      error: new Error("")
    }))
  }
}

function* watchTodo() {
  yield takeLatest(addTodo.started, sagaAddTodo);
  yield takeLatest(getTodo.started, sagaGetTodos);
  yield takeLatest(deleteTodo.started, sagaDeleteTodo);
  yield takeLatest(updateDoneTodo.started, sagaUpdateDoneTodo);
}

export default function* todoSaga() {
  yield all([fork(watchTodo)]);
}
