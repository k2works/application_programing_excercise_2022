import React from "react";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC = () => {
    return (
      <ul>
        <TodoItemView
          title={"a"}
          status={"未着手"}
          id={0}
          completed={false}
          dueDate={""}
        ></TodoItemView>
        <TodoItemView
          title={"b"}
          status={"未着手"}
          id={0}
          completed={true}
          dueDate={""}
        ></TodoItemView>
        <TodoItemView
          title={"c"}
          status={"未着手"}
          id={0}
          completed={false}
          dueDate={""}
        ></TodoItemView>
      </ul>
    );
};
