import { call, put, takeLatest } from 'redux-saga/effects';
import fetchWrap from '../utils/fetch_wrap';
import { addTodo, addTodoSuccess, deleteTodo, deleteTodoSuccess, getTodo, getTodoFailed, getTodoSuccess, updateDoneTodo, updateDoneTodoSuccess } from 'slices/todo_slice';
// import { addTodo, deleteTodo, getTodo, updateDoneTodo } from '../actions/todo_action';


export function* sagaAddTodo(action: ReturnType<typeof addTodo>) {
  try {
    yield call(fetchWrap, "todo_list", { data: { text: action.payload, done: false }, method: "POST" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(addTodoSuccess(payload));
  } catch (e) {

  }
}

export function* sagaDeleteTodo(action: ReturnType<typeof deleteTodo>) {
  try {
    yield call(fetchWrap, `todo_list/${action.payload}`, { method: "DELETE" });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(deleteTodoSuccess(payload));
  } catch (e) {

  }
}

export function* sagaUpdateDoneTodo(action: ReturnType<typeof updateDoneTodo>) {
  try {
    yield call(fetchWrap, `todo_list/${action.payload.id}`, { method: "PATCH", data: { done: action.payload.done } });
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(updateDoneTodoSuccess(payload));
  } catch (e) {

  }
}

export function* sagaGetTodos() {
  try {
    const { payload } = yield call(fetchWrap, "todo_list");
    yield put(getTodoSuccess(payload));
  } catch (e) {
    yield put(getTodoFailed(new Error("error")));
  }
}

export default function* todoSaga() {
  yield takeLatest(addTodo, sagaAddTodo);
  yield takeLatest(getTodo, sagaGetTodos);
  yield takeLatest(deleteTodo, sagaDeleteTodo);
  yield takeLatest(updateDoneTodo, sagaUpdateDoneTodo);
}
