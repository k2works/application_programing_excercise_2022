import * as React from "react";
import Logo from "./img/logo.svg";

const App = () => (
  <div>
    <header className="header">
      <div className="header-container w-container">
        <a href="index.html">
          <img src={Logo} alt="logo" width={135} height={25} />
        </a>

        <button className="navbtn">
          <i className="fas fa-bars"></i>
          <span className="sr-only">MENU</span>
        </button>
      </div>
    </header>

    <section className="hero">
      <div className="hero-container w-container">
        <h1>Stationery Service</h1>
        <p>便利な道具とサービスをお届けします</p>
        <a href="#">無料で始める</a>
      </div>
    </section>
  </div>
);

export default App;
