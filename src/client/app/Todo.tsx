import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAsync } from "../features/todo/todoSlice";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";
import { TodoMessageView } from "../components/TodoMessageView";
import { RootState } from "../reducers";

export const Todo: React.VFC = () => {
  const { isLoading, isError } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectAllAsync());
  }, []);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <TodoMessageView></TodoMessageView>
          <TodoInputView></TodoInputView>
          <TodoListView></TodoListView>
        </div>
      )}
      <TodoItemCountView></TodoItemCountView>
    </div>
  );
};
