import React from "react";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC = () => {
  const items = [
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
    { title: "b", status: "未着手", id: 0, completed: true, duDate: "" },
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
  ];

  const getApi = (url: string) => {
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

  const result = getApi("http://localhost:3000/api/todos");
  result.then((data: any) => {
    console.log(data.value);
  });

  return (
    <ul>
      {items.map((item) => (
        <TodoItemView
          title={item.title}
          status={item.status}
          id={item.id}
          completed={item.completed}
          dueDate={item.duDate}
        ></TodoItemView>
      ))}
    </ul>
  );
};
