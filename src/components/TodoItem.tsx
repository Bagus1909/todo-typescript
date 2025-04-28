import React, { useState } from "react";
import { Todo } from "../types/components";


type TodoItemProps = {
  todos: {
    id: number;
    title: string;
  };
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem: React.FC<TodoItemProps> = ({ todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <li
      key={todos.id}
      className='p-2 my-2 rounded shadow-md flex justify-between items-center'
    >
      {isEditing ? (
        <input
          value={todos.title}
          className='flex-1/2 p-2 border border-gray-300 rounded outline-none focus:border-blue-500 me-2'
          onChange={(e) => {
            setTodos((prev) => prev.map((todo) => (todo.id === todos.id ? { ...todo, title: e.target.value } : todo)));
          }}
        />
      ) : (
        <span className=''>{todos.title}</span>
      )}
      <div className='flex gap-1'>
        {isEditing ? (
          <button
            className='px-3 py-1 bg-green-500 border-1 border-indigo-600 shadow-md shadow-indigo-600 rounded-md cursor-pointer'
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Update
          </button>
        ) : (
          <button
            className='px-3 py-1 bg-green-500 border-1 border-indigo-600 shadow-md shadow-indigo-600 rounded-md cursor-pointer'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className='px-3 py-1 bg-red-500 border-1 border-indigo-600 shadow-md shadow-indigo-600 rounded-md cursor-pointer'
          onClick={() => {
            setTodos((prev) => prev.filter((todo) => todo.id !== todos.id));
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
