import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from 'actions/todo_action'
import { ITask, ITodoState } from 'reducers/todo_reducer';
import { AnyAction, Dispatch } from 'redux';
import { TodoComponent } from "components/todo/todo_component"
import { AppState } from 'reducers/root_reducer';
import { FILTER } from 'reducers/filter_reducer';


const getFilterTodos = (tasks: ITask[], filter: FILTER) => {
  switch (filter) {
    case FILTER.SHOW_ALL:
      return tasks
    case FILTER.SHOW_ACTIVE:
      return tasks.filter(t => !t.done)
    case FILTER.SHOW_DONE:
      return tasks.filter(t => t.done)
  }
}

const mapStateToProps = (state: AppState) => {
  return { filterGenre: state.filter.genre, tasks: getFilterTodos(state.todo.tasks, state.filter.genre) }
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({ dispatch });

export const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoComponent);
