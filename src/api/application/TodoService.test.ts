import connection from "../utils/connection";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
import { Todo } from "../domain/Todo";
import { TodoService } from "./TodoService";
import { TodoRequest } from "../presentation/TodoController";

describe("TodoService", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it("やることを作成する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: todo.Id,
    };
    await servce.create(params);
    const result = await servce.selectAll();
    expect(result.Value[0].Title).toBe("タイトル");
  });

  it("やることを検索する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: todo.Id,
    };
    await servce.create(params);
    if (todo.Id !== null) {
      const result = await servce.find(todo.Id);
      expect(result.Title).toBe("タイトル");
    }
  });

  it("やることを更新する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: todo.Id,
    };
    await servce.create(params);
    let result = await servce.selectAll();

    const id = result.Value[0].Id;
    if (id !== null) {
      const todo2 = new Todo(
        "タイトル2",
        true,
        new CreatedAt(new Date()),
        new CompletedAt(null),
        new DueDate(null),
        id
      );

      const params2: TodoRequest = {
        title: todo2.Title,
        completed: todo2.Completed,
        createdAt: todo2.CreatedAt,
        completedAt: todo2.CompletedAt,
        dueDate: todo2.DueDate,
        id: todo2.Id,
      };
      await servce.update(params2);
      result = await servce.selectAll();
    }
    expect(result.Value[0].Title).toBe("タイトル2");
  });

  it("やることを削除する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: todo.Id,
    };
    await servce.create(params);
    let result = await servce.selectAll();
    if (result.Value[0].Id !== null) {
      await servce.delete(result.Value[0].Id);
      result = await servce.selectAll();
      expect(result.Value.length).toBe(0);
    }
  });

  it("やることの件数を取得する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: todo.Id,
    };
    await servce.create(params);
    if (todo.Id !== null) {
      const result = await servce.count();
      expect(result).toBe(1);
    }
  });
});

