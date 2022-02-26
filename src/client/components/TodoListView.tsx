import React from "react";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC<{ data: any }> = (props: any) => {
  return (
    <div>
      <ul>
        {props.data.map((item: any) => (
          <TodoItemView
            title={item.title}
            status={item.status}
            id={item.id}
            completed={item.completed}
            dueDate={item.dueDate}
            key={item.id}
          ></TodoItemView>
        ))}
      </ul>
    </div>
  );
};
