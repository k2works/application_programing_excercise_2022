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
npm install --save-dev browser-sync jest @babel/core @babel/cli @babel/preset-env @babel/register
npm install --save-dev npm-run-all watch foreman cpx rimraf marked
npm install webpack webpack-cli html-webpack-plugin --save-dev
touch Procfile
npm install cypress
npmx cypress open
npm install --save-dev style-loader css-loader
npm i @nano-sql/core --save
npm install --save-dev cypress-cucumber-preprocessor
npm install -D webpack-dev-server
npm install --save express uuid cors
npm install --save typescript@4.5.5 ts-node@10.5.0 @types/express @types/cors @types/node
npm install --save-dev jest@27.5.1 ts-jest@27.1.3 ts-node-dev@1.1.8 @types/jest 
npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs
npm install --save-dev typescript ts-loader
npm install --save cross-env
npm install typeorm reflect-metadata --save
npm install better-sqlite3 --save
npm i -S tsoa swagger-ui-express
npm i -D @types/swagger-ui-express
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
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)
- [Building REST API with Express, TypeScript and Swagger](https://dev.to/rsbh/building-rest-api-with-express-typescript-and-swagger-2dma)
- [tsoa](https://tsoa-community.github.io/docs/)