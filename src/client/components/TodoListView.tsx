import React from "react";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC = () => {
  const items = [
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
    { title: "b", status: "未着手", id: 0, completed: true, duDate: "" },
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
  ];

  return (
    <ul>
      {items.map((item) => (
        <TodoItemView
          title={item.title}
          status={item.status}
          id={item.id}
          completed={item.completed}
          dueDate={item.duDate}
        ></TodoItemView>
      ))}
    </ul>
  );
};
