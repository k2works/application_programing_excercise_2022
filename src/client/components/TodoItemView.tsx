import React, { useEffect, useState } from "react";

type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
};

const useTodoUpdateApi = (url: string, item: any) => {
  const [todo, setTodo] = useState(item);

  useEffect(() => {
    const putApi = (url: string, data: any) => {
      const service = (
        resolve: (value?: string) => void,
        reject: (reason?: any) => void
      ) => {
        fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
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
      if (todo.id !== 0) await putApi(url, todo);
    })();
  });

  return [todo, setTodo];
};

const useDeleteApi = (url: string, id: number) => {
  const deleteApi = async (url: string, data: number) => {
    const service = (
      resolve: (value?: string) => void,
      reject: (reason?: any) => void
    ) => {
      fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data }),
      })
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
  (async () => deleteApi(url, id))();

  return [];
};

export const TodoItemView: React.FC<Props> = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const item = {
    title: props.title,
    status: props.status,
    id: props.id,
    completed: isCompleted,
    dueDate: dueDate,
  };
  const [todo, setTodo] = useTodoUpdateApi(
    "http://localhost:3000/api/todo",
    item
  );

  const dueValue = (value: any) => {
    if (value === null || value === "") {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(!isCompleted);
    setTodo({ ...todo, completed: !isCompleted });
  };

  const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    setTodo({ ...todo, dueDate: dueValue(e.target.value) });
  };

  const handleClickDelete = async () => {
    useDeleteApi("http://localhost:3000/api/todo", props.id);
    setTodo({ ...todo, id: 0 });
  };

  const element = () => {
    if (isCompleted) {
      return (
        <li className=" status not-started">
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          <s>{props.title}</s>
          <s className="due">{props.dueDate}</s>
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
            x
          </button>
        </li>
      );
    } else {
      return (
        <li className=" status not-started">
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          {props.title} By
          <input
            className="due"
            type="date"
            value={dueValue(dueDate)}
            placeholder="check"
            onChange={handleChangeDueDate}
          />
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
            x
          </button>
        </li>
      );
    }
  };

  return element();
};
