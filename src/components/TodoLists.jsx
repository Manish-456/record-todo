import React, { useMemo, useState } from "react";
import { useTodo } from "../context/todoContext";
import TodoList from "./TodoList";
import { ArrowDown01, ArrowUp10 } from "lucide-react";

export default function TodoLists() {
  const { todos, clearAll } = useTodo();
  const [order, setOrder] = useState("asc");

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => (order === "asc" ? b.id - a.id : a.id - b.id));
  }, [todos, order]);

  const Icon = order === "asc" ?  ArrowUp10 : ArrowDown01;

  return (
    <>
     {todos.length > 1 && (
       <div className="w-full flex justify-between mb-2">
         <button
         onClick={clearAll}
        type="button"
        className="w-fit hover:bg-opacity-60  text-sm font-semibold"
      >
        Clear all
      </button>
       <Icon
       role="button"
       xlinkTitle="sort"
       className="ml-auto h-6 w-6 mb-2"
         onClick={() => setOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
       />
     </div>
     )}
      <div className="flex  flex-col gap-4">
        {sortedTodos
          .map((todo) => (
            <TodoList key={todo.id} todo={todo} />
          ))}
        {todos.length < 1 && (
          <div className="text-center text-sm text-slate-400 font-medium">
            No tasks listed.
          </div>
        )}
      </div>
    </>
  );
}
