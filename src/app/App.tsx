import * as React from "react";
import { DB } from "../infrastructure/DB";
import { Todo } from "./Todo";

const App: React.VFC<{}> = () => (
  <div>
    <Todo />
  </div>
);

export default App;
