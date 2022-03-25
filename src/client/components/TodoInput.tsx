import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createAsync, Todo } from "../features/todo/todoSlice";

export const TodoInput: React.VFC<{}> = () => {
  const item: Todo = {
    id: 0,
    title: "",
    completed: false,
    dueDate: "",
    status: "",
  };
  const [todo, setTodo] = useState(item);
  const inputRef: any = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    dispatch(createAsync(todo));
  };

  return (
    <form id="js-form" onSubmit={handleCreate}>
      <input
        id="js-form-input"
        type="text"
        placeholder="What need to be done?"
        autoComplete="off"
        value={todo.title}
        onChange={handleChangeTitle}
        ref={inputRef}
      />
    </form>
  );
};
