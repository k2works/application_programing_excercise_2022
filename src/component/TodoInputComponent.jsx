import React, { useState } from "react";
import { Type } from "../application/TodoService";

export const TodoInputComponent = (props) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (title === "") {
      props.setMessage("タイトルが未入力です");
      return;
    }

    const todo = {
      title,
      completed: false,
      status: "未着手",
      createdAt: new Date(),
    };
    props.service.execute(Type.CREATE, todo).then((todos) => {
      props.setItems(todos);
    });
  };

  return (
    <form id="js-form" onSubmit={handleSubmit}>
      <input
        id="js-form-input"
        type="text"
        placeholder="What need to be done?"
        autoComplete="off"
        value={title}
        onChange={handleChange}
      />
    </form>
  );
};
