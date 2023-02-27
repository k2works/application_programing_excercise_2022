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
            <form method="get" name="logout_form">
                <button onClick={handleOnClickLogout}>ログアウト</button>
            </form>
        </div>
    )
}
