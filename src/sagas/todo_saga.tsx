import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AnyAction } from 'redux';
import { call, put, takeLatest, /* take, select */ } from 'redux-saga/effects';
import fetchWrap from '../utils/fetchWrap';
import { addTodo } from '../actions/todo';


export function* sagaAddTodo(context: any) {
    const { payload, err } = yield call(fetchWrap, { url: 'add', type: 'POST' });
    if (payload && !err) {
        yield put(addTodo.done({ result: payload.result, params: context }));
    }
}
