import React, { memo, useContext } from "react";
import { AppContext } from "../App";

export const TodoItemCountComponent = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return <span id="js-todo-count">Todoアイテム数: {state.count}</span>;
});
