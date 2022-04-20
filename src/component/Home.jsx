import React from "react";
import Logo from "../img/logo.svg";
import Tool from "../img/tool.jpg";
import Helpful from "../img/helpful.jpg";
import News01 from "../img/news01.jpg";
import News02 from "../img/news02.jpg";
import News03 from "../img/news03.jpg";
import News04 from "../img/news04.jpg";
import News05 from "../img/news05.jpg";
import News06 from "../img/news06.jpg";

export const Home = (props) => {
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

      <section className="posts">
        <div className="w-container">
          <h2 className="heading">
            New Releases
            <span>最新情報</span>
          </h2>

          <div className="posts-container">
            <article className="post">
              <a href="#">
                <figure>
                  <img src={News01} alt="" width={1000} height={750} />
                </figure>
                <h3>スパンコール</h3>
                <p>
                  キラキラと光を反射する装飾素材です。いつもの道具にアクセントを付けます。
                </p>
              </a>
            </article>

            <article className="post">
              <a href="#">
                <figure>
                  <img src={News02} alt="" width={1000} height={750} />
                </figure>
                <h3>卓上ランタン</h3>
                <p>
                  手元に灯りが欲しいときに、便利でかわいい卓上ランタンです。
                </p>
              </a>
            </article>

            <article className="post">
              <a href="#">
                <figure>
                  <img src={News03} alt="" width={1000} height={750} />
                </figure>
                <h3>冊子印刷</h3>
                <p>スタンダードプランにも手軽な冊子印刷が登場しました。</p>
              </a>
            </article>

            <article className="post">
              <a href="#">
                <figure>
                  <img src={News04} alt="" width={1000} height={750} />
                </figure>
                <h3>マグネット</h3>
                <p>
                  メモやアイデアを貼り出しておくなら、かわいいマグネットがおすすめです。
                </p>
              </a>
            </article>

            <article className="post">
              <a href="#">
                <figure>
                  <img src={News05} alt="" width={1000} height={750} />
                </figure>
                <h3>ビジネスノート</h3>
                <p>
                  書き心地や開きさすさにこだわった、ビジネス用のノートたちを紹介します。
                </p>
              </a>
            </article>

            <article className="post">
              <a href="#">
                <figure>
                  <img src={News06} alt="" width={1000} height={750} />
                </figure>
                <h3>ボールペン</h3>
                <p>
                  スタイリッシュなボールペンで仕事環境の雰囲気を変えてみました。
                </p>
              </a>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container w-container">
          <div className="footer-site">
            <a href="/">
              <img src={Logo} alt="Boards" width={135} height={26} />
            </a>
          </div>

          <ul className="footer-sns">
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
                <span className="sr-only">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
                <span className="sr-only">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </li>
          </ul>
          <ul className="footer-menu">
            <li>
              <a href="#">会社外由生</a>
            </li>
            <li>
              <a href="#">特定商取引</a>
            </li>
            <li>
              <a href="#">個人情報の取り扱い</a>
            </li>
            <li>
              <a href="content">サービス案内</a>
            </li>
            <li>
              <a href="#">お問い合わせ</a>
            </li>
          </ul>
          <div className="footer-copy">@ Boards Production.</div>
        </div>
      </footer>
    </div>
  );
};