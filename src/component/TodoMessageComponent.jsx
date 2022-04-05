import React, { memo } from "react";

export const TodoMessageComponent = memo((props) => {
  return <div className="js-message">{props.state.message}</div>;
});
