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
          item={item}
          status={item.status}
        ></TodoItemComponent>
      ))}
    </ul>
  );
});
