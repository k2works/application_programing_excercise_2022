import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./component/MainComponent";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
