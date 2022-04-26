import React from "react";
import "../style.css";
import Log from "../img/logo.svg";

export const Content: React.FC<{}> = () => {
  return (
    <div>
      <header className="header">
        <div className="header-container w-container">
          <div className="site">
            <a href="/">
              <img src={Log} alt="" width={135} height={26} />
            </a>
          </div>

          <button className="navbtn">
            <i className="fas fa-bars"></i>
            <span className="sr-only">MENU</span>
          </button>
        </div>
      </header>
    </div>
  );
};
