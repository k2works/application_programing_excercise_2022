import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Content } from "./component/ContentComponent";
import { Main } from "./component/MainComponent";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </div>
  );
};

export default App;
