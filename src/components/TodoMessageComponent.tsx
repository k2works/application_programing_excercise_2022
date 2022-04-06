import React, { memo } from "react";
import { useSelector } from "react-redux";
import { selectTodoMessage } from "../features/todoSlice";

export const TodoMessageComponent: React.VFC<{}> = memo(() => {
  const message = useSelector(selectTodoMessage);

  return <div className="js-message">{message}</div>;
});
