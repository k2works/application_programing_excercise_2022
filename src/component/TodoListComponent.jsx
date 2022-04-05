import React, { memo, useContext } from "react";
import { AppContext } from "../App";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <ul>
      {state.todos.map((item) => (
        <TodoItemComponent
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          dueDate={item.dueDate}
          status={item.status}
        ></TodoItemComponent>
      ))}
    </ul>
  );
});
