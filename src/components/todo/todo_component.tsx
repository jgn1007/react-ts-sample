import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { addTodo, deleteTodo, filterTodo, getTodo, updateDoneTodo } from 'actions/todo_action';
import { initTodoState, ITask, ITodoState } from 'reducers/todo_reducer';
import { useEffect, useState } from 'react';
import { isPropertySignature } from 'typescript';
import { FILTER } from 'reducers/filter_reducer';
import { FilterButton } from './filter_button';

interface ITodoProps {
  //filterGenre: FILTER
  tasks: ITask[]
  filterGenre: number
  dispatch: Dispatch<AnyAction>
}

interface IState {
  text: string;
}

export const TodoComponent = ({ tasks, filterGenre, dispatch }: ITodoProps) => {
  const [task, setTask] = useState("");
  useEffect(() => {
    dispatch(getTodo.started({}))
  }, [])
  return (
    <section style={{ width: '500px', margin: '0 auto' }}>
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={task}
        placeholder="task"
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={(e) => {
        e.preventDefault()
        if (!task.trim()) return
        dispatch(addTodo.started(task))
        setTask("");
      }}>Add Todo</button>
      <button
        onClick={() => dispatch(filterTodo(FILTER.SHOW_ALL))}
        disabled={filterGenre === FILTER.SHOW_ALL ? true : false}
        style={{
          marginLeft: '4px',
        }}
      >ShowAll </button>
      <button
        onClick={() => dispatch(filterTodo(FILTER.SHOW_ACTIVE))}
        disabled={filterGenre === FILTER.SHOW_ACTIVE ? true : false}
        style={{
          marginLeft: '4px',
        }}
      >ShowActive </button>
      <button
        onClick={() => dispatch(filterTodo(FILTER.SHOW_DONE))}
        disabled={filterGenre === FILTER.SHOW_DONE ? true : false}
        style={{
          marginLeft: '4px',
        }}
      >ShowDone </button>
      <ul>
        {
          tasks?.map((task) => (
            <li key={task.id.toString()} style={{ padding: 2 }}>
              <span>{task.id}</span>
              <span>{task.text}</span>
              <button
                onClick={() => {
                  dispatch(deleteTodo.started(task.id))
                }}
              >
                Delete
              </button>
              {task.done ? <button onClick={() => { dispatch(updateDoneTodo.started({ id: task.id, done: false })) }}>Active</button> :
                <button onClick={() => { dispatch(updateDoneTodo.started({ id: task.id, done: true })) }}>Done</button>}
              {task.done ? <span>done!</span> : null}
            </li>))
        }
      </ul>
    </section>
  )
}
