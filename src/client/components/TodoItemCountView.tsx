import React from "react";
import { userCountApi } from "../app/Todo";

export const TodoItemCountView: React.FC<{ count: number }> = (props) => {
  const [count, setCount] = userCountApi(props.count);

  return (
    <footer className="footer">
      <span id="js-todo-count">Todoアイテム数: {count}</span>
    </footer>
  );
};
