import React, { useState } from "react";
import {
  useTodoUpdateApi,
  useDeleteApi,
  Props,
  useTodoSelectAllApi,
  MessageType,
  Context,
} from "../app/Todo";

export const TodoItemView: React.FC<Props> = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const [isCompleted, setIsCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const item = {
    title: props.title,
    status: props.status,
    id: props.id,
    completed: isCompleted,
    dueDate: dueDate,
  };
  const [todo, setTodo, update] = useTodoUpdateApi(item);
  const [todoList, selectAll] = useTodoSelectAllApi([], dispatch);

  const dueValue = (value: any) => {
    if (value === null || value === "") {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const handleChangeCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsCompleted(!isCompleted);
      const result = await update({ ...todo, completed: !isCompleted });
      if (result.data.error) {
        dispatch({
          type: "FAILURE",
          message: result.data.error,
          messageType: MessageType.error,
        });
      } else {
        dispatch({
          type: "SUCCESS",
          payload: state.data,
          message: "Success",
          messageType: MessageType.success,
        });
        selectAll();
      }
    } catch (e) {
      dispatch({
        type: "FAILURE",
        message: e,
        messageType: MessageType.error,
      });
    }
  };

  const handleChangeDueDate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      dispatch({ type: "FETCH_INIT" });
      setDueDate(e.target.value);
      const result = await update({
        ...todo,
        dueDate: dueValue(e.target.value),
      });
      if (result.data.error) {
        dispatch({
          type: "FAILURE",
          message: result.data.error,
          messageType: MessageType.error,
        });
      } else {
        selectAll();
        dispatch({
          type: "SUCCESS",
          payload: todoList,
          message: "Success",
          messageType: MessageType.success,
        });
      }
    } catch (e) {
      dispatch({
        type: "FAILURE",
        message: e,
        messageType: MessageType.error,
      });
    }
  };

  const handleClickDelete = async () => {
    try {
      useDeleteApi(props.id);
      setTodo({ ...todo, id: 0 });
      selectAll();
      dispatch({
        type: "SUCCESS",
        payload: state.data,
        message: "Success",
        messageType: MessageType.success,
      });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
      dispatch({
        type: "FAILURE",
        message: error,
        messageType: MessageType.error,
      });
    }
  };

  const statusClassName = () => {
    if (isCompleted) {
      return "status completed";
    } else if (dueDate !== null) {
      return "status in-progress";
    } else {
      return "status not-started";
    }
  };

  const element = () => {
    if (isCompleted) {
      return (
        <li className={statusClassName()}>
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          <s>{props.title}</s>
          <s className="due">{dueValue(props.dueDate)}</s>
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
            x
          </button>
        </li>
      );
    } else {
      return (
        <li className={statusClassName()}>
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
