import React, { useState } from "react";
import "../style.scss";

type Todo = {
  id: number;
  task: string;
  deadline: Date;
  done: boolean;
};

const taskList: Todo[] = [
  {
    id: 1,
    task: "Java本の原稿を入稿する",
    deadline: new Date(2021, 9, 30),
    done: false,
  },
  {
    id: 2,
    task: "猫の予防接種を受ける",
    deadline: new Date(2021, 10, 10),
    done: false,
  },
  {
    id: 3,
    task: "卵と牛乳と豆腐を買う",
    deadline: new Date(2021, 10, 15),
    done: false,
  },
];

export const MainComponent: React.FC<{}> = () => {
  const [dialog, setDialog] = useState(false);
  const toggleDialog = () => setDialog(!dialog);

  return (
    <div>
      <h1>タスク管理アプリケーション</h1>

      <div className="task_form">
        <h2>タスクの登録</h2>

        <form action="/">
          <label>タスク</label>
          <input name="task" type="text" />
          <label>期限</label>
          <input name="deadline" type="date" />
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
            {taskList.map((task) => (
              <tr key={task.id}>
                <td className="hidden">{task.id}</td>
                <td>{task.task}</td>
                <td width={100}>{task.deadline.toISOString().slice(0, 10)}</td>
                <td width={50}>{task.done ? "完了" : "未完了"}</td>
                <td width="50px">
                  <button type="submit" onClick={toggleDialog}>
                    更新
                  </button>
                </td>
                <td width="50px">
                  <form action="/">
                    <button type="submit" id="delete_button">
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
            <div className="task_form">
              <h2>タスクの更新</h2>
              <form action="/">
                <input id="update_id" name="id" type="hidden" />
                <label>タスク</label>
                <input id="update_task" name="task" type="text" />
                <label>期限</label>
                <input id="update_deadline" name="deadline" type="date" />
                <label>状態</label>
                <select id="update_status" name="done">
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
