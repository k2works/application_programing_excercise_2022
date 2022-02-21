import * as React from "react";
import * as ReactDOM from "react-dom";
import { SubComponent } from "./sub-component";

import "./style.css";
const app = require("./App.js");
const dev = require("./Dev.js");
let apiUrl = "http://localhost:3000/api";
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://ape2022.herokuapp.com/api";
}
const view = new app.App(apiUrl);
view.mount();
dev.setUp();

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <SubComponent name="My Counter for TypeScript" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
