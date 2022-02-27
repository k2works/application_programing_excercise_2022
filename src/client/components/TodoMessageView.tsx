import React from "react";
import { MessageType } from "../app/Todo";

export const TodoMessageView: React.FC<{
  message: string;
  messageType: string;
}> = (props) => {
  if (props.messageType === MessageType.success) {
    return <div className="message success">{props.message}</div>;
  } else if (props.messageType === MessageType.error) {
    return <div className="message error">{props.message}</div>;
  } else {
    return <div className="message">{props.message}</div>;
  }
};
