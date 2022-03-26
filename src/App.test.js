import { EventEmitter } from "./EventEmitter";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";

const spyLog = jest.spyOn(console, "log");
spyLog.mockImplementation((x) => x);

describe("EvenEmitterの実行サンプル", () => {
  test("イベントをディスパッチする", () => {
    const event = new EventEmitter();
    event.addEventListener("test-event", () => console.log("One!"));
    event.addEventListener("test-event", () => console.log("Two!"));
    event.emit("test-event");

    expect(console.log).toBeCalled();
    expect(spyLog.mock.calls[0][0]).toEqual("One!");
    expect(spyLog.mock.calls[1][0]).toEqual("Two!");
  });
});

describe("TodoItemModelを利用するサンプルコード", () => {
  test("それぞれIDは異なる", () => {
    const item = new TodoItemModel({
      title: "未完了のTodoアイテム",
      completed: false,
    });
    const completedItem = new TodoItemModel({
      title: "完了済みのTodoアイテム",
      completed: true,
    });

    expect(item.id).not.toEqual(completedItem.id);
  });
});

describe("TodoListModelを利用するサンプルコード", () => {
  test("Todoリストにアイテムが増える", () => {
    const todoListModel = new TodoListModel();
    todoListModel.onChange(() => {
      console.log("TodoListの状態が変わりました");
    });
    todoListModel.addTodo(
      new TodoItemModel({
        title: "新しいTodoアイテム",
        completed: false,
      })
    );

    expect(console.log).toBeCalled();
    expect(todoListModel.getTotalCount()).toEqual(1);
  });

  test("Todoリストのアイテムを更新する", () => {
    const todoListModel = new TodoListModel();
    todoListModel.onChange(() => {
      console.log("TodoListの状態が変わりました");
    });
    todoListModel.addTodo(
      new TodoItemModel({
        title: "新しいTodoアイテム",
        completed: false,
      })
    );
    todoListModel.updateTodo({ id: 0, completed: true });

    expect(console.log).toBeCalled();
    const result = todoListModel.getTodoItems()[0];
    expect(result).toBeTruthy();
  });

  test("Todoリストのアイテムを削除する", () => {
    const todoListModel = new TodoListModel();
    todoListModel.onChange(() => {
      console.log("TodoListの状態が変わりました");
    });
    todoListModel.deleteTodo({ id: 0 });

    expect(console.log).toBeCalled();
    expect(todoListModel.getTotalCount()).toEqual(0);
  });
});