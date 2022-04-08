# 仕様

1 から 100 までの数をプリントするプログラムを書け。

ただし 3 の倍数のときは数の代わりに｢Fizz｣と、5 の倍数のときは｢Buzz｣とプリントし、

3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントすること

タイプごとに出力を切り替えることができる。

タイプ１は通常、タイプ２は数字のみ、タイプ３は FizzBuzzの場合のみをプリントする。 == 設計

## TODOリスト

  - ✓ 数を文字列にして返す
    
      - ✓ 1を渡したら文字列"1"を返す
    
      - ✓ 2を渡したら文字列"2"を返す

  - ✓ 3の倍数の時は数の変わりに「Fizz」と返す

  - ✓ 5の倍数の時は数の変わりに「Buzz」と返す

  - ✓ 3と5両方の倍数の場合には「FizzBuzz」と返す

  - ✓ 1から100までの数を返す
    
      - ✓ 配列の始めは文字列の1を返す
    
      - ✓ 配列の最後は文字列の100を返す
    
      - ✓ 配列の2番目は文字列のFizzを返す
    
      - ✓ 配列の4番目は文字列のBuzzを返す
    
      - ✓ 配列の14番目は文字列のBuzzを返す

  - ✓ プリントする

  - ✓ タイプ 1 の場合
    
      - ✓ 3の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。
    
      - ✓ 5 の倍数のときは｢Buzz｣とプリントできるようにする。
    
      - ✓ 3 と 5両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

  - ✓ タイプ 2 の場合
    
      - ✓ 3 の倍数のときは数をプリントできるようにする。
    
      - ✓ 5 の倍数のときは数をプリントできるようにする。
    
      - ✓ 3 と 5 両方の倍数の場合には値をプリントできるようにする。

  - ✓ タイプ 3 の場合
    
      - ✓ 3 の倍数のときは数をプリントできるようにする。
    
      - ✓ 5 の倍数のときは数をプリントできるようにする。
    
      - ✓ 3 と 5両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

## ユースケース図

## クラス図

### パッケージ構成

    package Presentaion {
        package View {
        }
    }
    
    
    package Application {
        package Service {
        }
    }
    
    package Domain {
        package Model {
        }
    
        package Type {
        }
    }
    
    Presentaion -> Application
    Application --> Domain

### Presentaion

#### View

    class View {
      props: FizzBuzzProps
      render(): String
    }
    class Container {
      props: FizzBuzzProps
      render(): String
    }
    class MessageComponent {
      props: FizzBuzzProps
      rendert(): String
    }
    class CounterComponent {
      props: FizzBuzzProps
      render(): String
    }
    class TableComponent {
      props: FizzBuzzProps
      render(): String
    }
    View -> Container
    View *-l FizzBuzzService
    Container *-- MessageComponent
    Container *-- CounterComponent
    Container *-- TableComponent

### Application

#### Service

    class FizzBuzzCommand
    class FizzBuzzListCommand
    class FizzBuzzValueCommand
    class FizzBuzzService
    
    FizzBuzzCommand <|-- FizzBuzzValueCommand
    FizzBuzzCommand <|-- FizzBuzzListCommand
    FizzBuzzService -> FizzBuzzCommand

### Domain

#### Model

    class FizzBuzzEntity
    class FizzBuzzList
    class FizzBuzzValue

#### Type

    class FizzBuzzType
    class FizzBuzzType01
    class FizzBuzzType02
    class FizzBuzzType03
    class FizzBuzzTypeEnum
    
    FizzBuzzType <|-- FizzBuzzType01
    FizzBuzzType <|-- FizzBuzzType02
    FizzBuzzType <|-- FizzBuzzType03
    FizzBuzzTypeEnum -> FizzBuzzType

## シーケンス図

# 開発

## Application

### Service

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/application/service/fizz_buzz/FizzBuzzCommand.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/application/service/fizz_buzz/FizzBuzzListCommand.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/application/service/fizz_buzz/FizzBuzzService.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/application/service/fizz_buzz/FizzBuzzValueCommand.ts[]
```

## Domain

### Model

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/model/fizz_buzz/FizzBuzzValue.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/model/fizz_buzz/FizzBuzzList.ts[]
```

### Type

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/type/fizz_buzz/FizzBuzzType.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/type/fizz_buzz/FizzBuzzType01.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/type/fizz_buzz/FizzBuzzType02.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/type/fizz_buzz/FizzBuzzType03.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/domain/type/fizz_buzz/fizzBuzzTypeEnum.ts[]
```

## Presentation

### View

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/presentation/view/fizz_buzz/View.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/presentation/view/fizz_buzz/Container.ts[]
```

### Component

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/presentation/view/fizz_buzz/component/CounterComponent.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/presentation/view/fizz_buzz/component/MessageComponent.ts[]
```

``` javascript
Unresolved directive in fizz_buzz.adoc - include::../../../../src/presentation/view/fizz_buzz/component/TableComponent.ts[]
```

# 参照
