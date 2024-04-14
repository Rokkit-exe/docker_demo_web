import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState("");

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todo');
      setTodos(response.data.data);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const postTodo = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/todo', data);
      return response.data;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const putTodo = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:5000/todo/${id}`, data);
      return response.data;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/todo/${id}`);
      console.log(response.data);
      return response.data;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const handleAddTodo = async (todo) => {
    try {
      await postTodo({
        Text: todo,
        IsChecked: false,
      });
      setTodo('');
      await getTodos();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const handleUpdateTodo = async (todo) => {
    try {
      await putTodo(todo._id, {
        Text: todo.Text,
        IsChecked: !todo.IsChecked,
      });
      await getTodos();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteTodo = async (todo) => {
    try {
      await deleteTodo(todo._id);
      await getTodos();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTodos()
  }, []);

  return (
    <div className="container">
      <h1>To do</h1>
      <div className="addConatiner">
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className='input'/>
        <button className="button" onClick={() => handleAddTodo(todo)}>Add todo</button>
      </div>
      {
        todos.length > 0 ? todos.map((todo, index) => {
          return (
            <div key={index} className='todo'>
              <input type="checkbox" checked={todo.IsChecked} onChange={() => handleUpdateTodo(todo)}/>
              <span className='text'>{todo.Text}</span>
              <button className='button' onClick={() => handleDeleteTodo(todo)}>Delete</button>
            </div>
          )
        }) : <p>No todos...</p>
      }
    </div>
  );
}

export default App;
