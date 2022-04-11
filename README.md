[![Node.js CI](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml/badge.svg)](https://github.com/k2works/application_programing_excercise_2022/actions/workflows/node.js.yml)
[![Todo](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/4uqmc1&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/4uqmc1/runs)
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
npm install --save-dev typescript ts-loader
npx tsc --init
npm i -save-dev @types/react @types/react-dom
npm install --save-dev typescript@4.5.5 jest@27.5.1 ts-jest@27.1.3 ts-node-dev@1.1.8 @types/jest
npm i -save @reduxjs/toolkit react-redux
npm install --save express uuid cors
npm install --save ts-node@10.5.0 @types/express @types/cors @types/node
npm install --save-dev ts-node-dev@1.1.8 
npm install --save cross-env
npm install --save typeorm reflect-metadata 
npm install --save better-sqlite3 
npm install --save-dev typedoc typedoc-plantuml tplant

```

**[⬆ back to top](#構成)**

### 配置

```bash
npm i -g vercel
heroku create ape2022-take8
heroku buildpacks:clear
heroku buildpacks:add heroku/jvm
heroku buildpacks:add heroku/nodejs
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
- [最新版TypeScript+webpack 5の環境構築まとめ](https://ics.media/entry/16329/)
- [TypeORM](https://typeorm.io/)
- [TYPE DOC](http://typedoc.org/)
- [tplant](https://github.com/bafolts/tplant)