import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAsync,
  deleteTaskAsync,
  readTaskAsyc,
  taskList,
  updateTaskAsync,
} from "../features/taskSlice";
import "../style.scss";

export type Task = {
  id: number;
  task: string;
  deadline: Date;
  done: boolean;
};

export const MainComponent: React.FC<{}> = () => {
  const [dialog, setDialog] = useState(false);
  const toggleDialog = () => setDialog(!dialog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readTaskAsyc() as any);
  }, []);

  const tasks = useSelector(taskList);

  const [inputTask, setInputTask] = useState<string>("");
  const [inputDeadline, setInputDeadline] = useState<string>("");

  const [id, setId] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  return (
    <div>
      <h1>タスク管理アプリケーション</h1>

      <div className="task_form">
        <h2>タスクの登録</h2>

        <form
          action="/"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addTaskAsync({ task: inputTask, deadline: inputDeadline }) as any
            );
          }}
        >
          <label>タスク</label>
          <input
            name="task"
            type="text"
            value={inputTask}
            onChange={(e) => {
              setInputTask(e.target.value);
            }}
          />
          <label>期限</label>
          <input
            name="deadline"
            type="date"
            value={inputDeadline}
            onChange={(e) => {
              setInputDeadline(e.target.value);
            }}
          />
          <input value="登録" type="submit" />
        </form>
      </div>

      <div className="tasklist">
        <h2>現在のタスク一覧</h2>
        <table>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th>タスク</th>
              <th>期限</th>
              <th>状態</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task: any) => (
              <tr key={task.id}>
                <td className="hidden">{task.id}</td>
                <td>{task.task}</td>
                <td width={100}>{task.deadline}</td>
                <td width={50}>{task.done ? "完了" : "未完了"}</td>
                <td width="50px">
                  <button
                    type="submit"
                    onClick={() => {
                      setId(task.id.toString());
                      setTask(task.task);
                      setDeadline(task.deadline.toString());
                      setDone(task.done);
                      toggleDialog();
                    }}
                  >
                    更新
                  </button>
                </td>
                <td width="50px">
                  <form action="/">
                    <button
                      type="submit"
                      id="delete_button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(deleteTaskAsync(task.id) as any);
                      }}
                    >
                      削除
                    </button>
                    <input type="hidden" name="id" />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dialog ? (
        <div>
          <div id="updateDialog">
            <div
              className="task_form"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(updateTaskAsync({ id, task, deadline, done }) as any);
              }}
            >
              <h2>タスクの更新</h2>
              <form action="/">
                <input id="update_id" name="id" type="hidden" value={id} />
                <label>タスク</label>
                <input
                  id="update_task"
                  name="task"
                  type="text"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                />
                <label>期限</label>
                <input
                  id="update_deadline"
                  name="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                />
                <label>状態</label>
                <select
                  id="update_status"
                  name="done"
                  onChange={() => setDone(!done)}
                >
                  <option value="false">未完了</option>
                  <option value="true">完了</option>
                </select>
                <div>
                  <button type="submit">更新</button>
                  <button type="reset" onClick={toggleDialog}>
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
