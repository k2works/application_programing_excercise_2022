import * as React from "react";
import "../static/css/style.scss";
import Image from "../static/img/thumb.jpg";
import {Navigate} from "react-router-dom";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {SubComponent as Sub} from "./Sub";
import {LogoutComponent as Logout} from "./Logout";
import {RootState} from "../app/store";
import {currentUser} from "../features/auth/authSlice";

export const MainComponent: React.FC<{}> = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = useAppSelector(currentUser);
    if (!user) return <Navigate to="/login"/>;

    return (
        <div>
            <Logout/>
            <h1>Hello React!</h1>
            <Sub name="My Counter for Babel"/>

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
