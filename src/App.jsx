import * as React from "react";
import { useEffect, useState } from "react";
import { TodoMessageComponent } from "./component/TodoMessageComponent";
import { TodoInputComponent } from "./component/TodoInputComponent";
import { TodoItemCountComponent } from "./component/TodoItemCountComponent";
import { TodoListComponent } from "./component/TodoListComponent";
import { TodoService, Type } from "./application/TodoService";

const App = (props) => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const service = new TodoService(props.db);

  useEffect(() => {
    service.execute(Type.READ, {}).then((todos) => {
      setItems(todos);
    });
  }, []);

  return (
    <div>
      <TodoMessageComponent message={message} />
      <TodoInputComponent
        service={service}
        setItems={setItems}
        setMessage={setMessage}
      />
      <TodoListComponent
        items={items}
        service={service}
        setItems={setItems}
        setMessage={setMessage}
      />
      <TodoItemCountComponent count={items.length} />
    </div>
  );
};

export default App;
