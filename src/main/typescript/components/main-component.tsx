import React, { useState } from "react";
import "../style.scss";

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
            <tr>
              <td className="hidden">1</td>
              <td>Java本の原稿を入港する</td>
              <td width={100}>2021-09-30</td>
              <td width={50}>未完了</td>
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
            <tr>
              <td className="hidden">2</td>
              <td>猫の予防接種を受ける</td>
              <td width={100}>2021-10-10</td>
              <td width={50}>未完了</td>
              <td width="50px">
                <button type="submit" onClick={toggleDialog}>
                  更新
                </button>
              </td>
              <td width="50px">
                <form action="/delete">
                  <button type="submit" id="delete_button">
                    削除
                  </button>
                  <input type="hidden" name="id" />
                </form>
              </td>
            </tr>
            <tr>
              <td className="hidden">3</td>
              <td>卵と牛乳と豆腐を買う</td>
              <td width={100}>2021-10-15</td>
              <td width={50}>未完了</td>
              <td width="50px">
                <button type="submit" onClick={toggleDialog}>
                  更新
                </button>
              </td>
              <td width="50px">
                <form action="/delete">
                  <button type="submit" id="delete_button">
                    削除
                  </button>
                  <input type="hidden" name="id" />
                </form>
              </td>
            </tr>
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
