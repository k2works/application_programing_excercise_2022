import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import App from "./app/App";
import {store} from "./app/store";

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
}

const Dev = require("./Dev.js");
Dev.setUp();
