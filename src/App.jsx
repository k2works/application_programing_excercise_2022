import * as React from "react";
import Logo from "./img/logo.svg";
import Tool from "./img/tool.jpg";
import Helpful from "./img/helpful.jpg";

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
        <a href="#" className="btn">
          無料で始める
        </a>
      </div>
    </section>

    <section className="imgtext">
      <div className="imgtext-container w-container">
        <div className="text">
          <h2 className="heading-decoration">日常のツールたち</h2>
          <p>Convenient</p>
          <p>
            どこにでもある、誰でも使ったことがある、普段は存在を意識しないけどないと困るツールたち。日常をちょっと楽しくしてくれます。
          </p>
        </div>
        <figure className="img">
          <img src={Tool} alt="" width={1600} height={1260} />
        </figure>
      </div>
    </section>

    <section className="imgtext">
      <div className="imgtext-container reverse w-container">
        <div className="text">
          <h2>効率化の手助け</h2>
          <p>Helpful</p>
          <p>
            さまざまな作業を効率よく進めるためには、目的に応じた最適な道具を使うことが大切です。そんな道具たちが揃ってます。
          </p>
        </div>
        <figure className="img">
          <img src={Helpful} alt="" width={1600} height={1260} />
        </figure>
      </div>
    </section>
  </div>
);

export default App;
