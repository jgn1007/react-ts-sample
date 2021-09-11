import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers/root_reducer';
import rootSaga from 'sagas/root_saga';

export default function configureStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware();
  const store = process.env.NODE_ENV === 'production' ?
    createStore(
      reducers,
      initialState,
      applyMiddleware(sagaMiddleware)
    )
    :
    createStore(
      reducers,
      initialState,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware))
    )
  sagaMiddleware.run(rootSaga);
  return store;
}
