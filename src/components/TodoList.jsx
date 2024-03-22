import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export const TodoList = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoText, setTodoText] = useState(todo.todo);
  const { updateTodo, deleteTodo, completedTodo } = useTodo();  

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoText });
    setIsEditable(false);
  };

  const CompletedTodo = () => {
    console.log(todo.id);
    completedTodo(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? 'bg-[#5c1919]' : 'bg-[#803838]'
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={CompletedTodo}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isEditable ? 'border-black/10 px-2' : 'border-transparent'
        } ${todo.completed ? 'line-through' : ''}`}
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        readOnly={!isEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isEditable) {
            editTodo();
          } else setIsEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isEditable ? '📁' : '✏️'}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};
