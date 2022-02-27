import React, { useEffect, useReducer, useState } from "react";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";
import { TodoMessageView } from "../components/TodoMessageView";

export type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
  setMessage: any;
};

const baseUrl = "http://localhost:3000/api";
const apiUrl = {
  selectAll: `${baseUrl}/todos`,
  create: `${baseUrl}/todo`,
  update: `${baseUrl}/todo`,
  delete: `${baseUrl}/todo`,
  count: `${baseUrl}/todos/count`,
};

export enum MessageType {
  success = "success",
  error = "error",
}

export const useTodoMessage = (message: any) => {
  const [messageState, setMessageState] = useState(message);
  const [messageType, setMessageType] = useState(MessageType.success);

  const setMessage = (message: any, type: MessageType) => {
    setMessageState(message);
    setMessageType(type);
  };

  return [messageState, messageType, setMessage];
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

export const useTodoSelectAllApi = (initialData: any) => {
  const [todoList, setTodoList] = useState(initialData);
  const url = apiUrl.selectAll;
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

  const selectAll = async () => {
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
      console.log(error);
      throw error;
    }
  };

  return [todoList, selectAll];
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

  const create = async () => {
    try {
      return await postApi(url, todo);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return [todo, setTodo, create];
};

export const useTodoUpdateApi = (item: any) => {
  const url = apiUrl.update;
  const [todo, setTodo] = useState(item);

  useEffect(() => {
    const putApi = (url: string, data: any) => {
      const service = (
        resolve: (value?: any) => void,
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
      try {
        if (todo.id !== 0) {
          const result = await putApi(url, todo);
          if (result.error) throw result.error;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    })();
  }, [todo]);

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
  (async () => {
    try {
      deleteApi(url, id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  })();

  return [];
};

export const userCountApi = (propsCount: number) => {
  const url = apiUrl.count;
  const [count, setCount] = useState(0);
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
  const [message, messageType, setMessage] = useTodoMessage("");
  const [state] = useTodoListApi([]);
  const [todoList, selectAll] = useTodoSelectAllApi(state.data);
  selectAll();

  return (
    <div>
      {state.isError && <div>Something went wrong ...</div>}
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <TodoMessageView
            message={message}
            messageType={messageType}
          ></TodoMessageView>
          <TodoInputView setMessage={setMessage}></TodoInputView>
          <TodoListView data={todoList} setMessage={setMessage}></TodoListView>
        </div>
      )}
      <TodoItemCountView count={todoList.length}></TodoItemCountView>
    </div>
  );
};
