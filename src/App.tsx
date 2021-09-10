import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import ButtonEffect from './components/ButtonEffect';
import TodoContainer from 'containers/todo_container'

function App() {
  const [clicks, setClicks] = useState<number>(0)
  return (
    //<ButtonEffect setClicks={setClicks} clicks={clicks} />
    // <Button setClicks={setClicks} clicks={clicks} />
    <TodoContainer />
  );
}

export default App;
