import * as React from "react";
import { TodoInputComponent } from "./component/TodoInputComponent";
import { TodoItemCountComponent } from "./component/TodoItemCountComponent";
import { TodoListComponent } from "./component/TodoListComponent";

const App = () => (
  <div>
    <TodoInputComponent />
    <TodoListComponent />
    <TodoItemCountComponent />
  </div>
);

export default App;
