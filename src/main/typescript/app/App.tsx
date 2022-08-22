import * as React from "react";
import {Route, Routes} from "react-router-dom";
import "../static/css/style.scss";
import {MainComponent as Main} from "../components/Main";
import {LoginComponent as Login} from "../components/Login";

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
};

export default App;
