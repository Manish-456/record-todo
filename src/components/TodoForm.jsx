import React, {useState} from "react";
import { useTodo } from "../context/todoContext";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        placeholder="Learn DSA"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="flex-1 border border-slate-500 outline-none rounded-md bg-transparent px-2 py-2 text-sm font-semibold "
      />
      <button
        type="submit"
        className="w-fit hover:bg-sky-400/60 bg-sky-400/70 text-sm font-semibold px-2 py-2 rounded-md"
      >
        Add Todo
      </button>
    </form>
  );
}
