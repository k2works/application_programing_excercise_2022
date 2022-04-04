import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItemComponent
          key={item.id}
          title={item.title}
          status={item.status}
          id={item.id}
          completed={item.completed}
          dueDate={item.duDate}
          service={props.service}
          setItems={props.setItems}
        ></TodoItemComponent>
      ))}
    </ul>
  );
};
