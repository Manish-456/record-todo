import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./context/todoContext";
import TodoLists from "./components/TodoLists";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title: todo, isCompleted: false },
    ]);
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos?.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, clearAll, editTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen">
        <div className="max-w-4xl p-4 text-gray-50 mx-auto w-full flex flex-col">
          <h2 className="text-sky-400 text-center font-semibold text-xl font-sans">
           Manage your Todos
          </h2>
          <p className="mt-2 text-sm  text-center text-slate-400 font-semibold">A task management app for organizing to-do lists and tracking daily responsibilites.</p>
          <div className="max-w-xl mx-auto h-[0.1px] mt-2 w-full bg-slate-50/40" />

          <div className="my-8">
            <TodoForm />
          </div>

          <TodoLists />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
