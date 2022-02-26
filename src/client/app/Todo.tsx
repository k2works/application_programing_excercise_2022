import React, { useEffect, useReducer, useState } from "react";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";

export type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
};

const baseUrl = "http://localhost:3000/api/";
const apiUrl = {
  selectAll: `${baseUrl}/todos`,
  create: `${baseUrl}/todo`,
  update: `${baseUrl}/todo`,
  delete: `${baseUrl}/todo`,
  count: `${baseUrl}/todos/count`,
};

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useTodoListApi = (initialData: any) => {
  const url = apiUrl.selectAll;
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

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
      dispatch({ type: "FETCH_INIT" });
      try {
        const result: any = await getApi(url);
        const items = result.value.map((item: any) => ({
          title: item.title.value,
          status: item.status.value,
          id: item.id,
          completed: item.isCompleted,
          dueDate: item.dueDate.value,
        }));
        dispatch({ type: "FETCH_SUCCESS", payload: items });
      } catch (error) {
        if (!didCancel) dispatch({ type: "FETCH_FAILURE" });
      }
    })();

    return () => {
      didCancel = true;
    };
  }, []);

  return [state];
};

export const useCreateApi = (item: any) => {
  const url = apiUrl.create;
  const [todo, setTodo] = useState(item);

  const postApi = (url: string, data: any) => {
    const service = (
      resolve: (value?: string) => void,
      reject: (reason?: any) => void
    ) => {
      fetch(url, {
        method: "POST",
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

  const create = async () => postApi(url, todo);

  return [todo, setTodo, create];
};

export const useTodoUpdateApi = (item: any) => {
  const url = apiUrl.update;
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

export const useDeleteApi = (id: number) => {
  const url = apiUrl.delete;
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

export const userCountApi = (propsCount: number) => {
  const url = apiUrl.count;
  const [count, setCount] = React.useState(0);
  useEffect(() => {
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

    (async () => {
      const result = await getApi(url);
      if (result) setCount(parseInt(result));
      if (propsCount === 0) setCount(0);
    })();
  }, [propsCount]);

  return [count, setCount];
};

export const Todo: React.FC = () => {
  const items = [
    { title: "", status: "", id: 0, completed: false, dueDate: "" },
  ];
  const [state] = useTodoListApi(items);

  const handleChange = () => {
    useTodoListApi(state);
  };

  return (
    <div>
      {state.isError && <div>Something went wrong ...</div>}
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <TodoInputView></TodoInputView>
          <form onSubmit={handleChange}>
            <TodoListView data={state.data}></TodoListView>
          </form>
        </div>
      )}
      <TodoItemCountView count={state.data.length}></TodoItemCountView>
    </div>
  );
};
