import { EventEmitter } from "./infrastructure/EventEmitter";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { TodoItemView } from "./view/TodoItemView";
import { TodoListView } from "./view/TodoListView";

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
      id: 1,
      title: "未完了のTodoアイテム",
      completed: false,
    });
    const completedItem = new TodoItemModel({
      id: 2,
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

describe("TodoItemViewを利用するサンプルコード", () => {
  test("要素が入る", () => {
    const todoItemView = new TodoItemView();
    const todoItemModel = new TodoItemModel({
      title: "あたらしいTodo",
      completed: false,
    });
    const todoItemElement = todoItemView.createElement(todoItemModel, {
      onUpdateTodo: () => {},
      onDeleteTodo: () => {},
    });

    expect(todoItemElement.textContent).toMatch(/あたらしいTodo/);
  });
});

describe("TodoListViewを利用するサンプルコード", () => {
  test("要素が入る", () => {
    const todoListView = new TodoListView();
    const todoListModel = new TodoListModel();
    [...Array(10).keys()]
      .map((i) => new TodoItemModel({ title: `Todo${i}`, completed: false }))
      .map((j) => todoListModel.addTodo(j));
    const todoListElement = todoListView.createElement(
      todoListModel.getTodoItems(),
      {
        onUpdateTodo: () => {},
        onDeleteTodo: () => {},
      }
    );

    expect(todoListElement.textContent).toMatch(/Todo9/);
  });
});
