import { setMaxListeners } from "process";
import React, { useEffect, useRef, useState } from "react";
import { useCreateApi } from "../app/Todo";

export const TodoInputView: React.FC<{ setMessage: any }> = (props) => {
  const item = {
    title: "",
    completed: false,
  };

  const [todo, setTodo, create] = useCreateApi(item);
  const inputRef: any = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleCreate = async () => {
    try {
      create();
      props.setMessage("Success");
    } catch (error) {
      props.setMessage(error);
    }
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
