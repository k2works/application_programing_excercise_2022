[![Node.js CI](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml/badge.svg)](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml)

# アプリケーション開発のための練習プログラミング

## 概要

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 16.3.0    |      |

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
npm install --save-dev style-loader css-loader
npm install --save-dev fake-indexeddb
npm install dexie
npm install react react-dom
npm install --save-dev babel-loader @babel/preset-react
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
- [IndexedDB tutorial example code](https://github.com/andyhaskell/indexeddb-tutorial)
- [Dexie.js](https://dexie.org/)
- [最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築](https://ics.media/entry/16028/)
- [おんなじTODOアプリをuseState / useReducer / useContext / Redux / Recoil を使って実装してみた](https://qiita.com/gakinchoy7/items/30d37bf912b21359ac3c#usecontext%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E5%AE%9F%E8%A3%85)