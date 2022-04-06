# 仕様

# 設計

## TODOリスト

  - ❏ TODO

  - ✓ TODO DONE

## ユースケース図

    left to right direction
    skinparam packageStyle rectangle
    actor customer
    actor clerk
    rectangle checkout {
      customer -- (checkout)
      (checkout) .> (payment) : include
      (help) .> (checkout) : extends
      (checkout) -- clerk
    }

## クラス図

    class Car
    Driver - Car : drives >
    Car *- Wheel : have 4 >
    Car -- Person : < owns

## シーケンス図

    participant User
    User -> A: DoWork
    activate A
    A -> B: << createRequest >>
    activate B
    B -> C: DoWork
    activate C
    C --> B: WorkDone
    destroy C
    B --> A: RequestCreated
    deactivate B
    A -> User: Done
    deactivate A

## 数式

[Using Multiple Stem
Interpreters](https://asciidoctor.org/docs/user-manual/#activating-stem-support)

Water () is a critical component.

sqrt(4) = 2

# 開発

# 参照
