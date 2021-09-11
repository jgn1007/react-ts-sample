import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addTodo, deleteTodo, filterTodo, getTodo, updateDoneTodo } from '../actions/todo_action';

export enum FILTER {
  SHOW_ALL,
  SHOW_DONE,
  SHOW_ACTIVE
}

export interface IFilterState {
  genre: FILTER.SHOW_ALL | FILTER.SHOW_DONE | FILTER.SHOW_ACTIVE
}

export const initFilterState: IFilterState = {
  genre: FILTER.SHOW_ALL
};

export const redFilter = reducerWithInitialState(initFilterState)
  .case(filterTodo, (state, payload) => {
    return Object.assign({}, state, { genre: payload })
  })
  .build();
