import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AnyAction } from 'redux';
import { call, put, takeLatest, /* take, select */ } from 'redux-saga/effects';
import fetchWrap from '../utils/fetchWrap';
import { addTodo } from '../actions/todo';


export function* sagaAddTodo(context: any) {
  try {
    const { payload, err } = yield call(fetchWrap, { url: 'todo_list', type: 'POST', data: {} });
    yield put(addTodo.done({ result: payload.result, params: context }));
  } catch (e) {
    yield put(addTodo.failed({
      params: context,
      error: new Error("")
    }))
  }

}
