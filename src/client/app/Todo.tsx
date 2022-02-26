import * as React from "react";
import { TodoInputView } from "../components/TodoInputView";
import { TodoListView } from "../components/TodoListView";

export const Todo: React.FC = () => (
  <div>
    <TodoInputView></TodoInputView>
    <TodoListView></TodoListView>
  </div>
);
