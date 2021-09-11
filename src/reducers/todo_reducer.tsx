import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addTodo, deleteTodo, filterTodo, getTodo, updateDoneTodo } from '../actions/todo_action';

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
  .case(addTodo.started, (state) => Object.assign({}, state, { isFetching: true }))
  .case(addTodo.done, (state, payload) => ({ ...state, tasks: payload.result, isFetching: false }))
  .case(addTodo.failed, (state, payload) => Object.assign({}, state, { isFetching: false }))
  .case(getTodo.started, (state) => Object.assign({}, state, { isFetching: true, }))
  .case(getTodo.done, (state, payload) => ({ ...state, tasks: payload.result, isFetching: false }))
  .case(getTodo.failed, (state, payload) => Object.assign({}, state, { isFetching: false }))
  .case(deleteTodo.started, (state) => Object.assign({}, state, { isFetching: true, }))
  .case(deleteTodo.done, (state, payload) => ({ ...state, tasks: payload.result, isFetching: false }))
  .case(deleteTodo.failed, (state, payload) => Object.assign({}, state, { isFetching: false }))
  .case(updateDoneTodo.started, (state) => Object.assign({}, state, { isFetching: true, }))
  .case(updateDoneTodo.done, (state, payload) => ({ ...state, tasks: payload.result, isFetching: false }))
  .case(updateDoneTodo.failed, (state, payload) => Object.assign({}, state, { isFetching: false }))
  .build();
