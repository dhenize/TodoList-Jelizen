import React, { useState } from 'react';

//IMPORTED PICTURES
import edit from './Pics/edit.png';
import bin from './Pics/delete.png';
import add from './Pics/plus.png';


//FUNCTION
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

  function addTodo() {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString(),
      completedAt: null,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  }

  function confirmEdit() {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
    setShowEditPopup(false);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toLocaleString() : null,
            }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function startEdit(todo) {
    setEditId(todo.id);
    setEditText(todo.text);
    setShowEditPopup(true);
  }
  

  //MAIN FUNCTION AND DESIGNS
  return (
    <div className='items-center h-[40rem] p-3 rounded-xl'>
      {/* MAIN SECTION */}
      <section className='mx-20 my-5'>
        <div className='flex flex-row gap-5 items-center'>
          <h1 className='text-3xl font-bold'>Task</h1>
          <h2 className='bg-[#CC9629] py-1.5 px-6 rounded-md'>{todos.length}</h2>
        </div>

        <div className='flex flex-row items-center'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter task here...'
            className='flex-grow my-7 w-[30rem] h-[3rem] items-center bg-white rounded-l-md border text-sm'
          />
          <button
            onClick={addTodo}
            className='flex justify-center items-center bg-[#CC9629] w-[3rem] h-[3rem] rounded-r-md'
          >
            <img src={add} className='h-[2rem]' />
          </button>
        </div>

        <ul className='space-y-3'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex flex-col md:flex-row items-start md:items-center p-5 my-4 rounded-md bg-[#ECEFCE]'
            >
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className='accent-[#CC9629] mr-2 h-5 w-5'
                />
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
              </div>
              
              <div className='text-xs text-gray-600 mt-1 md:mt-0 md:ml-4'>
                Created: {todo.createdAt}
                {todo.completed && <div>Completed: {todo.completedAt}</div>}
              </div>

              <div className='flex gap-2 mt-2 px-5 md:mt-0 md:ml-auto'>
                <button onClick={() => startEdit(todo)} className='text-blue-600'>
                  <img src={edit} alt='Edit' className = "h-5" />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <img src={bin} alt='Delete' className = "h-5" />
                </button>
              </div>

            </li>
          ))}
        </ul>

        {showEditPopup && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center'>
            <div className='bg-white p-5 rounded shadow-md w-96'>
              <h2 className='text-lg font-semibold mb-4'>Edit Task</h2>
              <input
                type='text'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className='w-full p-2 border rounded mb-4'
              />
              <div className='flex justify-end gap-2'>
                <button
                  onClick={() => setShowEditPopup(false)}
                  className='px-4 py-2 bg-gray-300 rounded'
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEdit}
                  className='px-4 py-2 bg-[#CC9629] text-white rounded'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
