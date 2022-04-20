import React from "react";
import Logo from "../img/logo.svg";
import Service from "../img/service.jpg";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Content = (props) => {
  return (
    <div>
      <Header />

      <article className="entry">
        <figure className="entry-img">
          <img src={Service} alt="" width={1600} height={470} />
        </figure>

        <div className="w-container">
          <h1 className="heading-decoration">サービス案内</h1>
          <p>Services</p>

          <div className="entry-container">
            <p>
              身近にあふれるたくさんの文具や事務用品。こうしたステーショナリーは仕事に欠かせないものであるのと同時に、毎日を楽しくしてくれるものであり、クリエイティブを刺激してくれるものでもあります。
            </p>
            <p>
              そして、デジタル化が進んだ現在では、スマートフォンやパソコンの中で便利な道具が必要とされるようになっています。
            </p>
            <p>
              Boadsではサブスクリプションの形式で、さまざまな道具の提供、販売、貸し出しなどのサービスを展開しています。
            </p>
            <p>
              主要都市にある工房スペースでは、最新の３Dプリンターやレーザーカッター、旋盤などの各種工具などもご利用いただけます。
            </p>
            <p>
              もちろん、オンライン上の便利な制作・管理ツールも取り揃えていますので、どんどん活用してください。
            </p>
          </div>
        </div>
      </article>

      <section className="plans">
        <div className="w-container">
          <h2 className="heading">
            Service Plans
            <span>サービスプラス</span>
          </h2>

          <div className="plans-container">
            <div className="plan">
              <h3>Free</h3>
              <p className="desc">
                便利なオンラインツールを今すぐご利用いただけるプランです。
              </p>
              <p className="price">無料</p>
              <a href="#" className="btn">
                使ってみる
              </a>
            </div>

            <div className="plan">
              <h3>Standard</h3>
              <p className="desc">
                厳選した最新ステーショナリーグッズを毎月お届けするスタンダードプランです。
              </p>
              <p className="price">980円/月</p>
              <a href="#" className="btn btn-accent">
                使ってみる
              </a>
            </div>

            <div className="plan">
              <h3>Pro</h3>
              <p className="desc">
                プロフェッショナルなツールの貸し出し、工房の利用など、さまざまなご要望にお応えするプランです。
              </p>
              <p className="price">2,800円/月</p>
              <a href="#" className="btn btn-accent">
                使ってみる
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
