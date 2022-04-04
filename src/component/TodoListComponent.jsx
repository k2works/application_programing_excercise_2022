import React from "react";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = () => {
  const items = [
    { title: "a", status: "完了", id: 0, completed: true, duDate: "" },
    { title: "b", status: "未着手", id: 0, completed: false, duDate: "" },
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
  ];

  return (
    <ul>
      {items.map((item) => (
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
