import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";
import { setUp } from "./Dev.js";
setUp();

import { SubComponent } from "./component/sub-component";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <SubComponent name="My Counter for Babel" />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#app"));
