import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addTodo } from '../actions/todo';

export interface ITask {
  id: number;
  text: string;
  done: boolean;
}

export interface ITodoState {
  tasks: ITask[];
  isFetching: boolean
}

export const initTodoState: ITodoState = {
  tasks: [],
  isFetching: false
};

export const redTodo = reducerWithInitialState(initTodoState)
  .case(addTodo.started, (state) => {
    return Object.assign({}, state, {
      isPrepared: true,
    })
  })
  .case(addTodo.done, (state, payload) => {
    return Object.assign({}, state, {
      payload,
      isPrepared: false,
    })
  })
  .case(addTodo.failed, (state, payload) => {
    return Object.assign({}, state, {
      isPrepared: false,
    })
  })
  .build();
