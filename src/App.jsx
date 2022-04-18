import * as React from "react";

const App = () => (
  <div>
    <header className="header">
      <div className="header-container">
        <a href="index.html">
          <img src="logo.svg" alt="Boards" width={135} height={25} />
        </a>
      </div>

      <button className="navbtn">
        <i className="fas fa-bars"></i>
        <span className="sr-only">MENU</span>
      </button>
    </header>
  </div>
);

export default App;
