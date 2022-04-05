import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = (props) => {
  return (
    <ul>
      {props.state.todos.map((item) => (
        <TodoItemComponent
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          dueDate={item.dueDate}
          status={item.status}
          state={props.state}
          dispatch={props.dispatch}
        ></TodoItemComponent>
      ))}
    </ul>
  );
};
