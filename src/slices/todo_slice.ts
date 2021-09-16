import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  id: number;
  text: string;
  done: boolean;
}

export interface ITodoState {
  tasks: ITask[];
  isFetching: boolean;
  error?: Error
}

export const initTodoState: ITodoState = {
  tasks: [],
  isFetching: false,
  error: undefined
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initTodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => ({ ...state }),
    addTodoSuccess: (state, action: PayloadAction<ITask[]>) => ({ ...state, tasks: action.payload, isFetching: false }),
    updateDoneTodo: (state, action: PayloadAction<{ id: number, done: boolean }>) => ({ ...state }),
    updateDoneTodoSuccess: (state, action: PayloadAction<ITask[]>) => ({ ...state, tasks: action.payload, isFetching: false }),
    deleteTodo: (state, action: PayloadAction<number>) => ({ ...state }),
    deleteTodoSuccess: (state, action: PayloadAction<ITask[]>) => ({ ...state, tasks: action.payload, isFetching: false }),
    getTodo: (state) => ({ ...state, isFetching: true }),
    getTodoSuccess: (state, action: PayloadAction<ITask[]>) => ({ ...state, tasks: action.payload, isFetching: false, error: undefined }),
    getTodoFailed: (state, action: PayloadAction<Error>) => ({ ...state, error: action.payload, isFetching: false }),
  },
})

export const {
  addTodo, addTodoSuccess,
  getTodo, getTodoSuccess, getTodoFailed,
  updateDoneTodo, updateDoneTodoSuccess,
  deleteTodo, deleteTodoSuccess
} = todoSlice.actions;
