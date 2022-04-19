import React from "react";
import Logo from "../img/logo.svg";

export const Content = (props) => {
  return (
    <div>
      <header className="header">
        <div className="header-container w-container">
          <a href="/">
            <img src={Logo} alt="logo" width={135} height={25} />
          </a>

          <button className="navbtn">
            <i className="fas fa-bars"></i>
            <span className="sr-only">MENU</span>
          </button>
        </div>
      </header>
    </div>
  );
};
