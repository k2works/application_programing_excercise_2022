import React from "react";

type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
};

export const TodoItemView: React.FC<Props> = (props) => {
  return (
    <li className=" status not-started">
      <input type="checkbox" placeholder="check" className="checkbox" />
      {props.title} By
      <input className="due" type="date" value="" placeholder="check" />
      {props.status}
      <button className="delete">x</button>
    </li>
  );
};