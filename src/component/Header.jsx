import React from "react";
import Logo from "../img/logo.svg";

export const Header = (props) => {
  const toggleMenu = () => {
    document.querySelector("html").classList.toggle("open");
  };

  return (
    <header className="header">
      <div className="header-container w-container">
        <div className="site">
          <a href="/">
            <img src={Logo} alt="logo" width={135} height={25} />
          </a>
        </div>

        <button className="navbtn" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
          <i className="fas fa-times"></i>
          <span className="sr-only">MENU</span>
        </button>

        <nav className="nav">
          <ul>
            <li>
              <a href="/">ホーム</a>
            </li>
            <li>
              <a href="/content">サービス案内</a>
            </li>
            <li>
              <a href="#">お問い合わせ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
