import { Todo } from "../infrastructure/entity/Todo";
import { Params, TodoService, Type } from "./TodoService";
import { AppDataSource } from "../infrastructure/data-source";

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
});
