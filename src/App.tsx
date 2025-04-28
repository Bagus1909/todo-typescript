import { useEffect, useState } from "react";

import TodoItem from "./components/TodoItem";
import { Todo } from "./types/components";



function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: input,
    };

    setTodos((todo) => [newTodo, ...todo]);

    setInput("");
  };

  return (
    <div className='bg-gray-500 h-screen w-screen flex flex-col items-center justify-center'>
      <div className='h-[620px] w-[920px] flex flex-col bg-gray-200 p-4 rounded-lg shadow-lg'>
        <h1 className='text-5xl mb-5 text-center'>Todo App</h1>
        <div className='w-full flex gap-3'>
          <input
            type='text'
            className='flex-1/2 p-2 border border-gray-300 rounded outline-none focus:border-blue-500'
            placeholder='Add a new todo'
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
            value={input}
          />
          <button
            className='px-3 py-1 bg-sky-600 border-1 border-indigo-600 shadow-md shadow-indigo-600 rounded-md cursor-pointer'
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todos) => (
            <TodoItem
              key={todos.id}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
