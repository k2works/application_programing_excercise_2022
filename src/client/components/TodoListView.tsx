import React, { useEffect, useState } from "react";
import { TodoItemCountView } from "./TodoItemCountView";
import { TodoItemView } from "./TodoItemView";

const useTodoListApi = (url: string, initialData: any) => {
  const [todoList, setTodoList] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
      setIsLoading(true);
      try {
        const result: any = await getApi(url);
        const items = result.value.map((item: any) => ({
          title: item.title.value,
          status: item.status.value,
          id: item.id,
          completed: item.isCompleted,
          dueDate: item.dueDate.value,
        }));
        setTodoList(items);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  return [{ todoList, isLoading, isError }];
};

export const TodoListView: React.FC = () => {
  const items = [
    { title: "", status: "", id: 0, completed: false, dueDate: "" },
  ];
  const [{ todoList, isLoading, isError }] = useTodoListApi(
    "http://localhost:3000/api/todos",
    items
  );

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {todoList.map((item: any) => (
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
      )}
      <TodoItemCountView count={todoList.length}></TodoItemCountView>
    </div>
  );
};
