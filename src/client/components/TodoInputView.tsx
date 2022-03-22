import React, { useEffect, useRef } from "react";
import {
  Context,
  MessageType,
  useCreateApi,
  useTodoSelectAllApi,
} from "../app/Todo";

export const TodoInputView: React.FC<{}> = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const [todoList, selectAll] = useTodoSelectAllApi([], dispatch);

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

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      const result = await create();
      if (result.data.error) {
        dispatch({
          type: "FAILURE",
          message: result.data.error,
          messageType: MessageType.error,
        });
      } else {
        selectAll();
        dispatch({
          type: "SUCCESS",
          payload: todoList,
          message: "Success",
          messageType: MessageType.success,
        });
      }
    } catch (error) {
      dispatch({
        type: "FAILURE",
        message: error,
        messageType: MessageType.error,
      });
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
