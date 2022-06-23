import * as React from "react";
import "../css/style.scss";
import Image from "../img/thumb.jpg";

import {SubComponent} from "./sub-component";

export const MainComponent: React.FC<{}> = () => {
    return (
        <div>
            <h1>Hello React!</h1>
            <SubComponent name="My Counter for Babel"/>

            <img src={Image} alt="image"/>

            <div className="my-grid">
                <header className="my-grid-item">ヘッダー</header>
                <aside className="my-grid-item">サイドバー</aside>
                <main className="my-grid-item">メインコンテンツ</main>
                <footer className="my-grid-item">フッター</footer>
            </div>
        </div>
    );
};
