import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItemComponent
          title={item.title}
          status={item.status}
          id={item.id}
          completed={item.completed}
          dueDate={item.duDate}
        ></TodoItemComponent>
      ))}
    </ul>
  );
};
