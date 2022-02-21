import * as React from "react";
import { SubComponent } from "../components/sub-component";

const App: React.FC = () => (
  <div>
    <h1>Hello React!</h1>
    <SubComponent name="My Counter for TypeScript" />
  </div>
);

export default App;
