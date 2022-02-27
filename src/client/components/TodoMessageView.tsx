import React from "react";

export const TodoMessageView: React.FC<{ message?: string }> = (props) => {
  return <div>{props.message}</div>;
};
