import React, { useEffect, useState } from "react";
import { TodoItemView } from "./TodoItemView";

export const TodoListView: React.FC = () => {
  const items = [
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
    { title: "b", status: "未着手", id: 0, completed: true, duDate: "" },
    { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
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
      const resultList = result.value;
      console.log(resultList);
      let itemList: any[] = [];
      let mapResult = {};
      resultList.forEach((item: any) => {
        mapResult = {
          title: item.title.value,
          status: item.status.value,
          id: item.id,
          completed: item.isCompleted,
          duDate: item.dueDate.value,
        };
        itemList.push(mapResult);
      });
      console.log(itemList);
      const items = [
        { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
        { title: "b", status: "未着手", id: 0, completed: true, duDate: "" },
        { title: "a", status: "未着手", id: 0, completed: false, duDate: "" },
      ];
      setTodoList(itemList);
    })();
  }, []);

  return (
    <ul>
      {todoList.map((item) => (
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
