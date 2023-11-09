import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [],

  addTodo: (todo) => {},
  editTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleTodo: (id) => {},
  clearAll : () => {}
});

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
