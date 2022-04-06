import React, { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../app/Todo";
import { selectTodoCount } from "../features/todoSlice";

export const TodoItemCountComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const count = useSelector(selectTodoCount);

  return <span id="js-todo-count">Todoアイテム数: {count}</span>;
});
