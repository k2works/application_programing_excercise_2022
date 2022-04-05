import React, { memo } from "react";

export const TodoItemCountComponent = memo((props) => {
  return <span id="js-todo-count">Todoアイテム数: {props.state.count}</span>;
});
