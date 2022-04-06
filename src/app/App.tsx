import * as React from "react";
import { SubComponent } from "../components/sub-component";
import { DB } from "../infrastructure/DB";
import { Todo } from "./Todo";

const App: React.VFC<{ db: DB }> = (props) => (
  <div>
    <h1>Hello React!</h1>
    <SubComponent name="My Counter for TypeScript" />
    <Todo db={props.db} />
  </div>
);

export default App;
