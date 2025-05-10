import React, { useState } from 'react';

import edit from './Pics/edit.png';
import bin from './Pics/delete.png';
import add from './Pics/plus.png';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD OR EDIT TASK
  function addOrEditTodo() {
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
      };
      setTodos([newTodo, ...todos]);
    }

    setInput("");
  }

  // TOGGLE COMPLETE
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

  // DELETE TASK
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // START EDITING
  function startEdit(todo) {
    setInput(todo.text);
    setEditId(todo.id);
  }

  return (
    <div className='flex h-[40rem] p-3 rounded-xl'>
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
            onClick={addOrEditTodo}
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
              <div className='flex items-center w-full md:w-auto'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className='mr-2'
                />
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
              </div>
              <div className='text-xs text-gray-600 mt-1 md:mt-0 md:ml-4'>
                Created: {todo.createdAt}
                {todo.completed && <div>Completed: {todo.completedAt}</div>}
              </div>
              <div className='flex gap-2 mt-2 md:mt-0 md:ml-auto'>
                <button onClick={() => startEdit(todo)} className='text-blue-600'>
                  <img src={edit} alt='Edit' />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <img src={bin} alt='Delete' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
