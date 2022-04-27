[![Node.js CI](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml/badge.svg)](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml)

# アプリケーション開発のための練習プログラミング

## 概要

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 16.3.0    |      |
| java         | 17.0.0    |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)
- [開発](#開発)

## 詳細

### Quick Start

```bash
npm install
npm start
```

### 構築

```bash
npm init -y
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
npm install --save-dev npm-run-all watch foreman cpx rimraf marked
npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server 
touch Procfile
npm install --save-dev jest
npm install cypress
npmx cypress open
npm install --save-dev cypress-cucumber-preprocessor
npm install --save-dev cucumber-html-reporter
npm install --save-dev asciidoctor asciidoctor-kroki
npm install react react-dom
npm install --save-dev babel-loader @babel/preset-react
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev sass-loader sass style-loader css-loader
npm install --save-dev identity-obj-proxy
npm install react-router-dom
npm install --save-dev typescript ts-loader
npm install --save @types/react @types/react-dom @types/react-router-dom
npm install --save-dev @types/jest ts-jest
npx tsc --init
npm i -save @reduxjs/toolkit react-redux
```

```bash
gradle init --type java-application
git update-index --chmod=+x gradlew
```

```bash
heroku create ape2022-take11
```

**[⬆ back to top](#構成)**

### 配置

```bash
npm i -g vercel
npm run deploy
```

**[⬆ back to top](#構成)**

### 運用

```bash
npm run deploy
```

**[⬆ back to top](#構成)**

### 開発

```bash
npm start
```

**[⬆ back to top](#構成)**

## 参照

- [Vercel](https://vercel.com/)
- [webpack](https://webpack.js.org/)
- [GitHub Actions でステータスバッジを表示する](https://qiita.com/SnowCait/items/487d70b342ffbe2f33d8)
- [cypress](https://www.cypress.io/)
- [cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor)
- [Asciidoctor Kroki Extension](https://github.com/Mogztter/asciidoctor-kroki)
- [Asciidoctor Documentation Site](https://docs.asciidoctor.org/)
- [『作って学ぶ　HTML＆CSSモダンコーディング』サポートサイト](http://book.mynavi.jp/supportsite/detail/9784839977115.html)
- [最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築](https://ics.media/entry/16028/)
- [最新版で学ぶwebpack 5入門スタイルシート(CSS/Sass)を取り込む方法](https://ics.media/entry/17376/#bundle-css)
- [Using with webpack](https://jestjs.io/docs/webpack)
- [React Router v6 はじめでもわかるルーティングの設定方法の基礎](https://reffect.co.jp/react/react-router-6)
- [最新版TypeScript+webpack 5の環境構築まとめ](https://ics.media/entry/16329/)
- [Quick template to test Redux Tool Kit and React Router with Jest](https://dev.to/siyile/quick-template-to-test-redux-tool-kit-and-react-router-with-jest-34ll)
- [環境構築から始めるテスト駆動開発 ~Java開発環境を構築する~](https://qiita.com/k2works/items/960020e6dbc70145226c)