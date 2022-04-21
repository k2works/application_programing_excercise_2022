import * as React from "react";
import "../style.css";
import Log from "../img/logo.svg";

export const Main: React.FC<{}> = () => {
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

      <section className="hero">
        <div className="hero-container w-container">
          <h1>Stationery Services</h1>
          <p>便利な道具とサービスをお届けします</p>
          <a href="#" className="btn">
            無料で始める
          </a>
        </div>
      </section>
    </div>
  );
};
