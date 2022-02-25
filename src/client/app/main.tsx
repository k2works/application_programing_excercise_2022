import * as React from "react";
import { TodoInputView } from "../components/TodoInputView";
import { TodoListView } from "../components/TodoListView";

const App: React.FC = () => (
  <div>
    <TodoInputView></TodoInputView>
    <TodoListView></TodoListView>
  </div>
);

export default App;
