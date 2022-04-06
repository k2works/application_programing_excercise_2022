import React, { memo, useContext } from "react";
import { AppContext, Todo } from "../App";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <ul>
      {state.todos.map((item: Todo) => (
        <TodoItemComponent key={item.id} item={item}></TodoItemComponent>
      ))}
    </ul>
  );
});
