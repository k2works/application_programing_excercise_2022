Feature: 予約管理:会議室の登録(選択)

  スタッフとして
  会議室を登録したい
  なぜなら会議室を利用するために必要だから

  Background:
    Given "スタッフ" としてログインしている

  Scenario: 会議室を登録する
    Given "会議室一覧画面" ページにアクセスする
    Given 会議室番号:" " 会議室名: " " で登録する
    Then 会議室一覧に "会議室番号が未入力です" がエラー表示される

  Scenario: 会議室を登録する
    Given "会議室一覧画面" ページにアクセスする
    Given 会議室番号:"123" 会議室名: " " で登録する
    Then 会議室一覧に "会議室名が未入力です" がエラー表示される

  Scenario: 会議室を登録する
    Given "会議室一覧画面" ページにアクセスする
    Given 会議室番号:"1234" 会議室名: "新会議室" で登録する
    Then 会議室一覧に "会議室番号は999以下である必要があります" がエラー表示される