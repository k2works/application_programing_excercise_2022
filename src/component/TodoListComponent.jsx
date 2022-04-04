import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = () => {
  return (
    <ul>
      <TodoItemComponent
        title={"a"}
        status={"未着手"}
        id={0}
        completed={false}
        dueDate={""}
      ></TodoItemComponent>
      <TodoItemComponent
        title={"b"}
        status={"未着手"}
        id={0}
        completed={false}
        dueDate={""}
      ></TodoItemComponent>
      <TodoItemComponent
        title={"c"}
        status={"未着手"}
        id={0}
        completed={false}
        dueDate={""}
      ></TodoItemComponent>
    </ul>
  );
};
