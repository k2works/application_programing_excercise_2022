import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from '../app/store';
import {currentUser, logout} from "../features/auth/authSlice";

export const LogoutComponent: React.FC<{}> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(currentUser);

    const handleOnClickLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div>
            <header className="header">
                <div className="header-container w-container">
                    <nav className="nav">
                        <ul>
                            <li>
                                <form method="get" name="logout_form">
                                    <a onClick={handleOnClickLogout}>ログアウト</a>
                                </form>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}
