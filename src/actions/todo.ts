import { ITask } from 'reducers/todo_reducer';
import actionCreatorFactory from 'typescript-fsa';
// actions
const actionCreator = actionCreatorFactory();
export const addTodo = actionCreator.async<string, ITask[], Error>('ADD_TODO');
export const deleteTodo = actionCreator.async<number, null, Error>('DELETE_TODO',);
export const updateDoneTodo = actionCreator.async<number, null, Error>('UPDATE_DONE_TODO',);
