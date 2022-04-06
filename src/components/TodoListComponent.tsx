import React, { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { Todo } from "../app/Todo";
import { selectTodos } from "../features/todoSlice";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent: React.VFC<{}> = memo(() => {
  const todos = useSelector(selectTodos);

  return (
    <ul>
      {todos.map((item: Todo) => (
        <TodoItemComponent key={item.id} item={item}></TodoItemComponent>
      ))}
    </ul>
  );
});