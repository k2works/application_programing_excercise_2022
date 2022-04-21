import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./style.scss";
import { MainComponent } from "./components/main-component";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </div>
  );
};

export default App;
