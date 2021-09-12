import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AnyAction } from 'redux';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import fetchWrap from '../utils/fetch_wrap';
import { addTodo, deleteTodo, getTodo, updateDoneTodo } from '../actions/todo_action';


export function* sagaAddTodo(action: ReturnType<typeof addTodo.started>) {
  try {
    yield call(fetchWrap, "todo_list", { data: { text: action.payload, done: false }, method: "POST" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(addTodo.done({ result: payload, params: action.payload }));
  } catch (e) {
    yield put(addTodo.failed({
      params: action.payload,
      error: new Error("")
    }))
  }
}

export function* sagaDeleteTodo(action: ReturnType<typeof deleteTodo.started>) {
  try {
    yield call(fetchWrap, `todo_list/${action.payload}`, { method: "DELETE" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(deleteTodo.done({ result: payload, params: action.payload }));
  } catch (e) {
    yield put(deleteTodo.failed({
      params: action.payload,
      error: new Error("")
    }))
  }
}

export function* sagaUpdateDoneTodo(action: ReturnType<typeof updateDoneTodo.started>) {
  try {
    yield call(fetchWrap, `todo_list/${action.payload.id}`, { method: "PATCH", data: { done: action.payload.done } });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(updateDoneTodo.done({ result: payload, params: action.payload }));
  } catch (e) {
    yield put(updateDoneTodo.failed({
      params: action.payload,
      error: new Error("")
    }))
  }
}

export function* sagaGetTodos(action: ReturnType<typeof getTodo.started>) {
  try {
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(getTodo.done({ result: payload, params: action.payload }));
  } catch (e) {
    yield put(getTodo.failed({
      params: action.payload,
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
