import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./component/Home";
import { Content } from "./component/Content";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content" element={<Content />} />
    </Routes>
  </div>
);

export default App;
