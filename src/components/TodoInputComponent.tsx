import React, { useState, memo, useContext } from "react";
import { Type } from "../application/TodoService";
import { AppContext } from "../app/Todo";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, createTodoAsync, selectTodo } from "../features/todoSlice";

export const TodoInputComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const dispatch2 = useDispatch();
  const todo = useSelector(selectTodo);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
    dispatch({ type: "CREATE", payload: { title: e.target.value } });
    dispatch2(createTodo(e.target.value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: "CREATE", payload: { title } });
    if (title !== "") {
      state.service.execute(Type.CREATE, state.todo).then((todos: any) => {
        dispatch({
          type: "READ",
          payload: { todo: state.todo, todos },
        });
      });
    }
    dispatch2(createTodo(todo.title));
    dispatch2(createTodoAsync(todo));
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
