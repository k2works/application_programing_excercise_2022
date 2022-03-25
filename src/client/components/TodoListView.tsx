import React from "react";
import { useSelector } from "react-redux";
import { Todo } from "../features/todo/todoSlice";
import { RootState } from "../reducers";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.VFC<{}> = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  return (
    <div id="js-todo-list">
      <ul>
        {todos.map((item: Todo) => (
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
