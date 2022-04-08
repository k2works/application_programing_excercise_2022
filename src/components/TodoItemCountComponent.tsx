import React, { memo } from "react";
import { useSelector } from "react-redux";
import { selectTodoCount } from "../features/todoSlice";

export const TodoItemCountComponent: React.VFC<{}> = memo(() => {
  const count = useSelector(selectTodoCount);

  return <span id="js-todo-count">Todoアイテム数: {count}</span>;
});
