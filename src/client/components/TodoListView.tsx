import React, { useEffect, useState } from "react";
import { TodoItemCountView } from "./TodoItemCountView";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC = () => {
  const items = [
    { title: "", status: "", id: 0, completed: false, dueDate: "" },
  ];
  const [todoList, setTodoList] = useState(items);

  useEffect(() => {
    const getApi = async (url: string) => {
      const service = (
        resolve: (value?: string) => void,
        reject: (reason?: any) => void
      ) => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            return resolve(json);
          })
          .catch((error) => {
            return reject(error);
          });
      };
      return new Promise(service);
    };

    (async () => {
      const result: any = await getApi("http://localhost:3000/api/todos");
      const items = result.value.map((item: any) => ({
        title: item.title.value,
        status: item.status.value,
        id: item.id,
        completed: item.isCompleted,
        dueDate: item.dueDate.value,
      }));
      setTodoList(items);
    })();
  });

  return (
    <div>
      <ul>
        {todoList.map((item) => (
          <TodoItemView
            title={item.title}
            status={item.status}
            id={item.id}
            completed={item.completed}
            dueDate={item.dueDate}
            key={item.id}
          ></TodoItemView>
        ))}
      </ul>

      <TodoItemCountView count={todoList.length}></TodoItemCountView>
    </div>
  );
};
