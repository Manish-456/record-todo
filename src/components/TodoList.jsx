import React, { useEffect, useRef, useState } from "react";
import { useTodo } from "../context/todoContext";
import { Edit, Trash } from "lucide-react";

export default function TodoList({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inpRef = useRef(null);

  const { deleteTodo, editTodo, toggleTodo } = useTodo();

  const handleEdit = (e) => {
    if (title && e.keyCode === 13) {
      editTodo(todo.id, title.trim());
      setIsEditable(false);
    }
  };

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  useEffect(() => {
    if (isEditable) {
      inpRef?.current?.focus();
      inpRef?.current?.setSelectionRange(0, inpRef?.current?.value?.length);
    }
  }, [isEditable, inpRef]);

  const handleChange = (id) => {
    toggleTodo(id);
  };

  const onBlur = () => {
    setIsEditable(false);
    setTitle(todo.title);
  }

  return (
    <div className="w-full flex  items-center bg-slate-400/10 rounded-md px-3 py-2">
      <div className="flex flex-1 gap-2 items-center">
        {!isEditable && <input
          type="checkbox"
          className="h-4 w-4 mt-0.5 shrink-0 cursor-pointer"
          checked={todo.isCompleted}
          onChange={() => handleChange(todo.id)}
        />}
        {isEditable ? (
          <input
            value={title}
            ref={inpRef}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            onKeyDown={handleEdit}
            className="bg-transparent flex-1 outline-none w-full"
            autoFocus
            onBlur={onBlur}
          />
        ) : (
          <h3
            className={`text-sm font-semibold ${
              todo.isCompleted && "line-through text-green-600"
            }`}
          >
            {todo.title}
          </h3>
        )}
      </div>
      {!isEditable && <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={toggleEditable}
          className="rounded-full hover:bg-slate-500/40  text-sm h-8 w-8"
        >
          <Edit className="h-4 text-green-500 w-4 mx-auto" />
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className=" rounded-full hover:bg-slate-500/40  text-sm h-8 w-8"
        >
          <Trash className="h-4 w-4 text-rose-500 mx-auto" />
        </button>
      </div>}
    </div>
  );
}
