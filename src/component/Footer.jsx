import React from "react";
import Logo from "../img/logo.svg";

export const Footer = (props) => {
  return (
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
            <a href="#">会社概要</a>
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
  );
};
