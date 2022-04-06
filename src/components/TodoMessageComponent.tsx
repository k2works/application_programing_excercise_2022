import React, { memo, useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../app/Todo";
import { selectTodoMessage } from "../features/todoSlice";

export const TodoMessageComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const message = useSelector(selectTodoMessage);

  return <div className="js-message">{message}</div>;
});
