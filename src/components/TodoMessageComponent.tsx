import React, { memo, useContext } from "react";
import { AppContext } from "../app/Todo";

export const TodoMessageComponent: React.VFC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return <div className="js-message">{state.message}</div>;
});
