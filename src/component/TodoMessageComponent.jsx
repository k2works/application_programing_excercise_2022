import React, { memo, useContext } from "react";
import { AppContext } from "../App";

export const TodoMessageComponent = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return <div className="js-message">{state.message}</div>;
});
