Feature: 会員管理:利用者の管理(基本)

  スタッフとして
  アプリケーション利用者の登録をしたい
  なぜなら登録された利用者しか認証できないから

  Background:
    Given "スタッフ" としてログインしている

  Scenario: 利用者を一覧表示する
    Given "利用者一覧画面" ページにアクセスする
    Then 利用者登録画面に利用者番号 "U000001" が表示される

  Scenario: 利用者を新規登録する
    Given "利用者一覧画面" ページにアクセスする
    Given 利用者番号 "U000005" を新規登録する
    Then 利用者登録画面に "利用者を登録しました" が表示される
    Given 新規登録した利用者番号 "U000005" で認証する
    Then 新規登録利用者で認証される

  Scenario: 登録済み利用者を更新登録する
    Given "利用者一覧画面" ページにアクセスする
    Given 利用者番号 "U000005" の利用者情報を更新する
    Then 利用者登録画面に "利用者を更新しました" が表示される
    Given 更新した利用者番号 "U000005" で認証する
    Then 更新した利用者で認証される

  Scenario: 登録済み利用者を削除する
    Given "利用者一覧画面" ページにアクセスする
    Given 利用者番号 "U000005" を削除する
    Then 利用者登録画面に "利用者を削除しました" が表示される
