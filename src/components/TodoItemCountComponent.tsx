import React, { memo, useContext } from "react";
import { AppContext } from "../app/Todo";

export const TodoItemCountComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return <span id="js-todo-count">Todoアイテム数: {state.count}</span>;
});
