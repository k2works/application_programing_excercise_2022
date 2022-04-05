import React, { useState, memo, useContext } from "react";
import { Type } from "../application/TodoService";
import { AppContext } from "../App";

export const TodoInputComponent = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    dispatch({ type: "CREATE", payload: { title: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "CREATE", payload: { title } });
    if (title !== "") {
      state.service.execute(Type.CREATE, state.todo).then((todos) => {
        dispatch({
          type: "READ",
          payload: { todo: state.todo, todos },
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
});
