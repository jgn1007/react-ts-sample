import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { addTodo, deleteTodo, updateDoneTodo } from 'actions/todo';
import { initTodoState, ITodoState } from 'reducers/todo_reducer';
import { useState } from 'react';
import { isPropertySignature } from 'typescript';

interface ITodoProps extends ITodoState {
  dispatch: Dispatch<AnyAction>
}

interface IState {
  text: string;
}

export const TodoComponent = ({ tasks, dispatch }: ITodoProps) => {
  const [task, setTask] = useState("");

  return (
    <section style={{ width: '500px', margin: '0 auto' }}>
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={task}
        placeholder="task"
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={() => {
        dispatch(addTodo.started(task))
        setTask("");
      }}>Add Todo</button>
      <ul>
        {
          tasks?.map((task: any) => {
            <li key={task.id.toString()}>
              <span>{task.id}</span>
              <span>{task.text}</span>
            </li>
          })
        }
      </ul>
    </section>
  )
}
