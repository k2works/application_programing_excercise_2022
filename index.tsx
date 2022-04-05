import * as React from "react";
import { createRoot } from "react-dom/client";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
  }
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

const Dev = require("./src/Dev.js");
Dev.setUp();
