import { Todo } from "../infrastructure/entity/Todo";
import { Todo as DomainObject } from "../domain/Todo";
import { Params, TodoService, Type } from "./TodoService";
import { AppDataSource } from "../infrastructure/data-source";
import { TodoEntity } from "../infrastructure/entity/TodoEntity";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";

describe("TodoServie", () => {
  describe("Case1", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.destroy();
    });

    beforeEach(async () => {
      await AppDataSource.manager.clear(Todo);
    });

    it("やることを追加する", async () => {
      const params: Params = { title: "test", completed: false };
      const todoService = new TodoService(Type.CREATE);
      await todoService.execute(params);
      const todos = await Todo.find();
      expect(todos[0].title).toEqual("test");
    });
  });

  describe("Case2", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.destroy();
    });

    beforeEach(async () => {
      await AppDataSource.manager.clear(Todo);
    });

    it("やることを編集する(期限あり)", async () => {
      const todo = new Todo();
      todo.title = "test";
      todo.completed = false;
      todo.createdAt = new Date();
      todo.status = "未着手";
      await todo.save();
      const dueDate = new Date(2022, 1, 1);
      const params: Params = {
        id: 1,
        title: "test",
        completed: true,
        dueDate,
      };
      const todoService = new TodoService(Type.UPDATE);
      await todoService.execute(params);
      const todos = await Todo.find();
      expect(todos[0].title).toEqual("test");
      expect(todos[0].completed).toEqual(true);
      expect(todos[0].dueDate).toEqual(dueDate);
    });
  });

  describe("Case3", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.destroy();
    });

    beforeEach(async () => {
      await AppDataSource.manager.clear(Todo);
    });

    it("やることを編集する(期限なし)", async () => {
      const todo = new Todo();
      todo.title = "test";
      todo.completed = false;
      todo.createdAt = new Date();
      todo.status = "未着手";
      await todo.save();
      const params: Params = {
        id: 1,
        title: "test",
        completed: true,
      };
      const todoService = new TodoService(Type.UPDATE);
      await todoService.execute(params);
      const todos = await Todo.find();
      expect(todos[0].title).toEqual("test");
      expect(todos[0].completed).toEqual(true);
      expect(todos[0].dueDate).toEqual(null);
    });
  });

  describe("Case4", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.destroy();
    });

    beforeEach(async () => {
      await AppDataSource.manager.clear(Todo);
    });

    it("やることを削除する", async () => {
      const todo = new Todo();
      todo.title = "test";
      todo.completed = false;
      todo.createdAt = new Date();
      todo.status = "未着手";
      await todo.save();
      const dueDate = new Date(2022, 1, 1);
      const params: Params = {
        id: 1,
        title: "test",
        completed: true,
        dueDate,
      };
      const todoService = new TodoService(Type.DELETE);
      await todoService.execute(params);
      const todos = await Todo.find();
      expect(todos.length).toEqual(0);
    });
  });

  describe("Case5", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.destroy();
    });

    beforeEach(async () => {
      await AppDataSource.manager.clear(TodoEntity);
    });

    it("やることを作成する", async () => {
      const servce = new TodoService(Type.CREATE);
      const todo = new DomainObject("タイトル");
      await servce.create(todo);
      const result = await servce.selectAll();
      expect(result[0].Title).toBe("タイトル");
    });

    it("やることを更新する", async () => {
      const servce = new TodoService(Type.UPDATE);
      const todo = new DomainObject("タイトル");
      await servce.create(todo);
      let result = await servce.selectAll();

      const id = result[0].Id;
      if (id !== null) {
        const todo2 = new DomainObject(
          "タイトル2",
          true,
          new CreatedAt(new Date()),
          new CompletedAt(null),
          new DueDate(null),
          "着手",
          id
        );

        await servce.update(todo2);
        result = await servce.selectAll();
      }
      expect(result[0].Title).toBe("タイトル2");
    });

    it("やることを削除する", async () => {
      const servce = new TodoService(Type.DELETE);
      const todo = new DomainObject("タイトル");
      await servce.create(todo);
      let result = await servce.selectAll();
      await servce.delete(result[0]);
      result = await servce.selectAll();
      expect(result.length).toBe(0);
    });
  });
});
