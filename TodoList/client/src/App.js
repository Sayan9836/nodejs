import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

const API_BASE = `http://localhost:5000`
function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newtodo, setNewTodo] = useState("")
  useEffect(() => {
    GetTodos();
  }, [])

  const GetTodos = async () => {
    await fetch(`${API_BASE}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(`${API_BASE}/todo/complete/${id}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
         
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete
      }
      return todo
    }));
  }

  const deleteTodo = async (id) => {
    const data = await fetch(`${API_BASE}/todo/delete/${id}`, {
      method: "DELETE",
    }).then(res => res.json())

    //  setTodos(todos=>todos.filter(todo=>todo._id!==data._id))
    GetTodos()
  }

  const addTodo = async () => {
    const data = await fetch(`${API_BASE}/todo/add`, {
      method: 'POST',
      body: JSON.stringify({ text: newtodo }),
      headers: {
        "content-Type": "application/json"
      }
    }).then(res => res.json())
    setTodos([...todos, data]);
    setNewTodo("");
    //  GetTodos();
  }
  return (
    <div className="App">
      <h1>Welcome SAYAN</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {
          todos?.map((todo) => {
            return <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} >
              <div className="checkbox" onClick={() => completeTodo(todo._id)}></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
            </div>
          })
        }

      </div>

      <div className="addpopup" onClick={() => setPopupActive(true)}>+</div>
      {
        popupActive ? (
          <div className="popup">
            <div className='closepopup' onClick={() => setPopupActive(false)}>x</div>
            <div className="input-field">
              <h3>Add Task</h3>
              <input type="text" className="add-todo-input" onChange={(e) => setNewTodo(e.target.value)} value={newtodo} placeholder='Type here ...' />
            </div>
            <div className='btn' onClick={addTodo}>Create Tasks</div>
          </div>

        ) : ''
      }
    </div>
  );
}

export default App;
