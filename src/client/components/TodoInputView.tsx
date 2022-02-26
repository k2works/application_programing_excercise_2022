import React, { useEffect, useRef, useState } from "react";
import { useCreateApi } from "../app/Todo";

export const TodoInputView: React.FC<{}> = () => {
  const item = {
    title: "",
    completed: false,
  };

  const [todo, setTodo, create] = useCreateApi(
    "http://localhost:3000/api/todo",
    item
  );
  const inputRef: any = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleCreate = async () => {
    create();
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
