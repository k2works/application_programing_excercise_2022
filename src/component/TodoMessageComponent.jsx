import React from "react";

export const TodoMessageComponent = (props) => {
  return <div className="js-message">{props.state.message}</div>;
};
