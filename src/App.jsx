import * as React from "react";
import Logo from "./img/logo.svg";

const App = () => (
  <div>
    <header className="header">
      <div className="header-container">
        <a href="index.html">
          <Logo width={135} height={25} />
        </a>

        <button className="navbtn">
          <i className="fas fa-bars"></i>
          <span className="sr-only">MENU</span>
        </button>
      </div>
    </header>
  </div>
);

export default App;
