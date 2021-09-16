import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ITask } from 'reducers/todo_reducer';
import { useEffect, useState } from 'react';
import { FILTER } from 'reducers/filter_reducer';
import { FilterButton } from './filter_button';
import { addTodo, deleteTodo, getTodo, updateDoneTodo } from 'slices/todo_slice';
import { AppState } from 'configStore';
import { filterTodo } from 'slices/filter_slice';

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

export const TodoComponent = () => {

  const { filterGenre, tasks, error, isFetching } = useSelector((state: AppState) => {
    return {
      filterGenre: state.filter.genre,
      tasks: getFilterTodos(state.todo.tasks, state.filter.genre),
      error: state.todo.error,
      isFetching: state.todo.isFetching
    }
  })
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  useEffect(() => {
    dispatch(getTodo())
  }, [])

  return (
    <section style={{ width: '700px', margin: '0 auto' }}>
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
        dispatch(addTodo(task))
        setTask("");
      }}>Add Todo</button>
      <FilterButton active={filterGenre === FILTER.SHOW_ALL ? true : false} name={"Show All"} onClick={() => dispatch(filterTodo(FILTER.SHOW_ALL))} />
      <FilterButton active={filterGenre === FILTER.SHOW_ACTIVE ? true : false} name={"Show Active"} onClick={() => dispatch(filterTodo(FILTER.SHOW_ACTIVE))} />
      <FilterButton active={filterGenre === FILTER.SHOW_DONE ? true : false} name={"Show Done"} onClick={() => dispatch(filterTodo(FILTER.SHOW_DONE))} />
      {
        isFetching ? <div>Fetching Data...</div> :
          !error ?
            <ul>
              {
                tasks?.map((task) => (
                  <li key={task.id.toString()} style={{ padding: 2 }}>
                    <span>{task.id}</span>
                    <span>{task.text}</span>
                    <button
                      onClick={() => {
                        dispatch(deleteTodo(task.id))
                      }}
                    >
                      Delete
                    </button>
                    {task.done ? <button onClick={() => { dispatch(updateDoneTodo({ id: task.id, done: false })) }}>Active</button> :
                      <button onClick={() => { dispatch(updateDoneTodo({ id: task.id, done: true })) }}>Done</button>}
                    {task.done ? <span>done!</span> : null}
                  </li>))
              }
            </ul> : <div>Network Error. Need to start the json server.</div>
      }
    </section>
  )
}
