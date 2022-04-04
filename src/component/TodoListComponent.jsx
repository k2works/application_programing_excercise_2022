import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <div id="js-todo-list">
          <TodoItemComponent
            key={item.id}
            title={item.title}
            status={item.status}
            id={item.id}
            completed={item.completed}
            dueDate={item.dueDate}
            service={props.service}
            setItems={props.setItems}
            setMessage={props.setMessage}
          ></TodoItemComponent>
        </div>
      ))}
    </ul>
  );
};
