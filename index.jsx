import * as React from "react";
import * as ReactDOM from "react-dom";
import { setUp } from "./src/Dev.js";
setUp();

import { SubComponent } from "./src/component/sub-component";

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
