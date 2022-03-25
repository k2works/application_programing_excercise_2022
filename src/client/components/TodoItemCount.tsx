import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countAsync } from "../features/todo/todoSlice";
import { RootState } from "../reducers";

export const TodoItemCount: React.VFC<{}> = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.todo.count);
  useEffect(() => {
    dispatch(countAsync());
  }, [count]);

  return (
    <footer className="footer">
      <span id="js-todo-count">Todoアイテム数: {count}</span>
    </footer>
  );
};
