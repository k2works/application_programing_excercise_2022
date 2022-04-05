import React from "react";

export const TodoItemCountComponent = (props) => {
  return <span id="js-todo-count">Todoアイテム数: {props.state.count}</span>;
};
