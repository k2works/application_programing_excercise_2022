import * as React from "react";
import {Route, Routes} from "react-router-dom";
import "../static/css/style.scss";
import {MainComponent as Main} from "../components/Main";

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </div>
    );
};

export default App;
