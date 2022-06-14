Feature: 会議室の登録

  管理者として
  会議室を登録したい
  なぜなら会議室を利用するために必要だから

  Background:
    Given "管理者" としてログインしている

  Scenario: 予約管理:会議室を登録する
    Given "会議室一覧画面" ページにアクセスする
    Given "新会議室" を登録する
    Then 会議室一覧に "新会議室" が表示される

  Scenario: 予約管理:予約可能な会議室を登録する
    Given "予約可能会議室一覧画面" ページにアクセスする
    Given "新会議室" を "2022-01-01" 予約可能登録する
    Then 予約可能会議室一覧に "新会議室" が表示される