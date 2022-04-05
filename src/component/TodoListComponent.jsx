import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItemComponent
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          dueDate={item.dueDate}
          status={item.status}
          service={props.service}
          setItems={props.setItems}
          setMessage={props.setMessage}
          state={props.state}
          dispatch={props.dispatch}
        ></TodoItemComponent>
      ))}
    </ul>
  );
};
