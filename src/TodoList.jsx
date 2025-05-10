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

  const activeTodos = todos.filter(todo => !todo.completed).length;

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

  return (
    <div className='items-center h-full p-3 rounded-xl'>
      {/* MAIN SECTION */}
      <section className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 my-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <h1 className='text-3xl font-bold'>Task</h1>
          <h2 className='bg-[#CC9629] py-1.5 px-6 rounded-md'>{activeTodos}</h2>
        </div>

        <div className='flex flex-row items-stretch mt-7 gap-0'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter task here...'
            className='flex-grow h-[3rem] bg-white rounded-l-md border text-sm px-3'
          />
          <button
            onClick={addTodo}
            className='flex justify-center items-center bg-[#CC9629] h-[3rem] rounded-r-md'
          >
            <img src={add} className='h-[2rem]' />
          </button>
        </div>

        <ul className='space-y-3 mt-6'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex flex-col sm:flex-row sm:items-start p-5 rounded-md bg-[#ECEFCE]'
            >
              <div className='flex items-start gap-2 w-full sm:w-2/3'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className='accent-[#CC9629] h-5 w-5 mt-1'
                />
                <div className='flex flex-col overflow-hidden text-left w-full'>
                  <span className={`break-words text-left pr-4 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.text}
                  </span>
                  <div className='mt-2 text-xs text-gray-600 flex flex-col items-start text-left'>
                    <span className='whitespace-pre-line'>Created: {todo.createdAt}</span>
                    {todo.completed && <span className='whitespace-pre-line'>Completed: {todo.completedAt}</span>}
                  </div>
                </div>
              </div>

              <div className='flex gap-2 mt-3 sm:mt-0 sm:ml-auto'>
                <button onClick={() => startEdit(todo)} className='text-blue-600'>
                  <img src={edit} alt='Edit' className='h-5' />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <img src={bin} alt='Delete' className='h-5' />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showEditPopup && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50'>
            <div className='bg-white p-5 rounded shadow-md w-11/12 max-w-md'>
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
