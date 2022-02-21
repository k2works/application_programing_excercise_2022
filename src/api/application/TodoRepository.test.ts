import connection from "../utils/connection";
import { CompletedAt } from "../domain/model/todo/CompletedAt";
import { TodoRepository } from "./TodoRepository";
import { CreatedAt } from "../domain/model/todo/CreatedAt";
import { DueDate } from "../domain/model/todo/DueDate";
import { Todo } from "../domain/model/todo/Todo";

describe("TodoRepository", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("正常系", () => {
    it("やることを作成する", async () => {
      const repository = new TodoRepository();
      const todo = new Todo("タイトル");
      await repository.addTodo(todo);
      const result = await repository.getTodos();
      expect(result.Value[0].Title).toBe("タイトル");
      expect(result.Value[0].Status).toBe("未着手");
    });

    it("やることを更新する", async () => {
      const repository = new TodoRepository();
      const todo = new Todo("タイトル");
      await repository.addTodo(todo);
      let result = await repository.getTodos();

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

        await repository.updateTodo(todo2);
        result = await repository.getTodos();
      }
      expect(result.Value[0].Title).toBe("タイトル2");
      expect(result.Value[0].Status).toBe("完了");
    });

    it("やることを削除する", async () => {
      const repository = new TodoRepository();
      const todo = new Todo("タイトル");
      await repository.addTodo(todo);
      let result = await repository.getTodos();
      await repository.deleteTodo(result.Value[0]);
      result = await repository.getTodos();
      expect(result.Value.length).toBe(0);
    });
  });

  describe("異常系", () => {});
});
