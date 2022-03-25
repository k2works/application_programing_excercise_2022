import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAsync } from "../features/todo/todoSlice";
import { TodoInput } from "../components/TodoInput";
import { TodoItemCount } from "../components/TodoItemCount";
import { TodoList } from "../components/TodoList";
import { TodoMessage } from "../components/TodoMessage";
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
          <TodoMessage></TodoMessage>
          <TodoInput></TodoInput>
          <TodoList></TodoList>
        </div>
      )}
      <TodoItemCount></TodoItemCount>
    </div>
  );
};
