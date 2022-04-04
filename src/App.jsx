import * as React from "react";
import { useEffect } from "react";
import { TodoInputComponent } from "./component/TodoInputComponent";
import { TodoItemCountComponent } from "./component/TodoItemCountComponent";
import { TodoListComponent } from "./component/TodoListComponent";

const App = () => {
  const items = [
    { title: "a", status: "完了", id: 1, completed: true, duDate: "" },
    { title: "b", status: "未着手", id: 2, completed: false, duDate: "" },
    { title: "a", status: "未着手", id: 3, completed: false, duDate: "" },
  ];

  return (
    <div>
      <TodoInputComponent />
      <TodoListComponent items={items} />
      <TodoItemCountComponent count={items.length} />
    </div>
  );
};

export default App;
