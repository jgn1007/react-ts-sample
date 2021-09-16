import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'reducers/todo_reducer';

export enum FILTER {
  SHOW_ALL,
  SHOW_DONE,
  SHOW_ACTIVE
}

export interface IFilterState {
  genre: FILTER
}

export const initFilterState: IFilterState = {
  genre: FILTER.SHOW_ALL
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initFilterState,
  reducers: {
    filterTodo: (state, action: PayloadAction<number>) => ({ ...state, genre: action.payload }),
  },
})

export const { filterTodo } = filterSlice.actions;
