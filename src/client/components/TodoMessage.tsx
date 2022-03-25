import React from "react";
import { useSelector } from "react-redux";
import { MessageType } from "../features/todo/todoSlice";
import { RootState } from "../reducers";

export const TodoMessage: React.VFC<{}> = () => {
  const { message } = useSelector((state: RootState) => state.todo);

  if (message.type === MessageType.success) {
    return <div className="message success">{message.text}</div>;
  } else if (message.type === MessageType.error) {
    return <div className="message error">{message.text}</div>;
  } else {
    return <div className="message">{message.text}</div>;
  }
};
