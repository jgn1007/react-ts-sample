import { ITask } from 'reducers/todo_reducer';
import actionCreatorFactory from 'typescript-fsa';
// actions
const actionCreator = actionCreatorFactory();
export const addTodo = actionCreator.async<string, ITask[], Error>('ADD_TODO');
export const getTodo = actionCreator.async<unknown, ITask[], Error>('GET_TODO');
export const deleteTodo = actionCreator.async<number, ITask[], Error>('DELETE_TODO',);
export const updateDoneTodo = actionCreator.async<{ id: number, done: boolean }, ITask[], Error>('UPDATE_DONE_TODO');
export const filterTodo = actionCreator<number>('FILTER_TODO');
