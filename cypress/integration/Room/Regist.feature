Feature: 会議室の登録

  管理者として
  会議室を登録したい
  なぜなら会議室を利用するために必要だから

  Background:
    Given "管理者" としてログインしている

  Scenario: 予約管理:会議室を登録する
    Given "会議室一覧画面" ページにアクセスする
    Then 会議室一覧に "新木場" が表示される
