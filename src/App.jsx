import * as React from "react";
import { useEffect, useState } from "react";
import { TodoInputComponent } from "./component/TodoInputComponent";
import { TodoItemCountComponent } from "./component/TodoItemCountComponent";
import { TodoListComponent } from "./component/TodoListComponent";
import { TodoService, Type } from "./application/TodoService";

const App = (props) => {
  const [items, setItems] = useState([]);
  const service = new TodoService(props.db);

  useEffect(() => {
    service.execute(Type.READ, {}).then((todos) => {
      setItems(todos);
    });
  }, []);

  return (
    <div>
      <TodoInputComponent />
      <TodoListComponent items={items} />
      <TodoItemCountComponent count={items.length} />
    </div>
  );
};

export default App;
