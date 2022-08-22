import * as React from "react";
import "../static/css/style.scss";
import Image from "../static/img/thumb.jpg";

import {SubComponent as Sub} from "./Sub";
import {LogoutComponent as Logout} from "./Logout";

export const MainComponent: React.FC<{}> = () => {
    return (
        <div>
            <h1>Hello React!</h1>
            <Sub name="My Counter for Babel"/>

            <img src={Image} alt="image"/>

            <div className="my-grid">
                <header className="my-grid-item">ヘッダー</header>
                <aside className="my-grid-item">サイドバー</aside>
                <main className="my-grid-item">メインコンテンツ</main>
                <footer className="my-grid-item">フッター</footer>
            </div>

            <Logout/>
        </div>
    );
};
