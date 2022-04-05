import React, { useState } from "react";
import { Type } from "../application/TodoService";

export const TodoInputComponent = (props) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    props.dispatch({ type: "CREATE", payload: { title: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch({ type: "CREATE", payload: { title } });
    if (title !== "") {
      props.state.service
        .execute(Type.CREATE, props.state.todo)
        .then((todos) => {
          props.setItems(todos);
          props.dispatch({
            type: "READ",
            payload: { todo: props.state.todo, todos },
          });
        });
    }
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
