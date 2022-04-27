import * as React from "react";
import "../style.scss";
import Image from "../thumb.jpg";

import { SubComponent } from "./sub-component";

export const MainComponent: React.FC<{}> = () => {
  return (
    <div>
      <h1>タスク管理アプリケーション</h1>

      <div className="task_form">
        <h2>タスクの登録</h2>

        <form action="/add">
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
              <input type="button" value="更新" />
              <input type="button" value="削除" />
            </tr>
            <tr>
              <td className="hidden">2</td>
              <td>猫の予防接種を受ける</td>
              <td width={100}>2021-10-10</td>
              <td width={50}>未完了</td>
              <input type="button" value="更新" />
              <input type="button" value="削除" />
            </tr>
            <tr>
              <td className="hidden">3</td>
              <td>卵と牛乳と豆腐を買う</td>
              <td width={100}>2021-10-15</td>
              <td width={50}>未完了</td>
              <input type="button" value="更新" />
              <input type="button" value="削除" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
