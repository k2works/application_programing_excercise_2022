import React from "react";

type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
};

export const TodoItemView: React.FC<Props> = (props) => {
  const dueValue = (value: any) => {
    if (value === null || value === "") {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const element = () => {
    if (props.completed) {
      return (
        <li className=" status not-started">
          <input type="checkbox" placeholder="check" className="checkbox" />
          <s>{props.title}</s>
          <s className="due">{props.dueDate}</s>
          {props.status}
          <button className="delete">x</button>
        </li>
      );
    } else {
      return (
        <li className=" status not-started">
          <input type="checkbox" placeholder="check" className="checkbox" />
          {props.title} By
          <input
            className="due"
            type="date"
            value={dueValue(props.dueDate)}
            placeholder="check"
          />
          {props.status}
          <button className="delete">x</button>
        </li>
      );
    }
  };

  return element();
};
