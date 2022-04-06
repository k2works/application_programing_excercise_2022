import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  createTodoAsync,
  selectIsError,
  selectTodo,
} from "../features/todoSlice";

export const TodoInputComponent: React.VFC<{}> = memo(() => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  const isError = useSelector(selectIsError);

  const handleChange = (e: any) => {
    dispatch(createTodo(e.target.value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createTodo(todo.title));
    if (!isError) dispatch(createTodoAsync(todo));
  };

  return (
    <form id="js-form" onSubmit={handleSubmit}>
      <input
        id="js-form-input"
        type="text"
        placeholder="What need to be done?"
        autoComplete="off"
        value={todo.title}
        onChange={handleChange}
      />
    </form>
  );
});
