import React from "react";
import { userCountApi } from "../app/Todo";

export const TodoItemCountView: React.FC<{ count: number }> = (props) => {
  const [count, setCount] = userCountApi(
    "http://localhost:3000/api/todos/count",
    props.count
  );

  return (
    <footer className="footer">
      <span>Todoアイテム数: {count}</span>
    </footer>
  );
};
