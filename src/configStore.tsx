import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import reducers from 'reducers/root_reducer';
import rootSaga from 'sagas/root_saga';
import { filterSlice } from 'slices/filter_slice';
import { todoSlice } from 'slices/todo_slice';

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
  filter: filterSlice.reducer
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureAppStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware();
  const store = process.env.NODE_ENV === 'production' ?
    createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    )
    :
    createStore(
      rootReducer,
      initialState,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware))
    )
  sagaMiddleware.run(rootSaga);
  return store;
}
