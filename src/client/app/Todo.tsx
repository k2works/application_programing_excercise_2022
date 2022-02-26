import React, { useEffect, useReducer } from "react";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";

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

const useTodoListApi = (url: string, initialData: any) => {
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

export const Todo: React.FC = () => {
  const items = [
    { title: "", status: "", id: 0, completed: false, dueDate: "" },
  ];
  const [state] = useTodoListApi("http://localhost:3000/api/todos", items);

  const handleChange = () => {
    useTodoListApi("http://localhost:3000/api/todos", state);
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
