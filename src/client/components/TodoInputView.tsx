import React, { useEffect, useRef, useState } from "react";

const useCreateApi = (url: string, item: any) => {
  const [todo, setTodo] = useState(item);

  const postApi = (url: string, data: any) => {
    const service = (
      resolve: (value?: string) => void,
      reject: (reason?: any) => void
    ) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          return resolve(json);
        })
        .catch((error) => {
          return reject(error);
        });
    };
    return new Promise(service);
  };

  const create = async () => postApi(url, todo);

  return [todo, setTodo, create];
};

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
