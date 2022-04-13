import { Repository } from "typeorm";
import { CompletedAt } from "../../domain/model/CompletedAt";
import { CreatedAt } from "../../domain/model/CreatedAt";
import { DueDate } from "../../domain/model/DueDate";
import { AppDataSource } from "../data-source";
import { TodoEntity as Entity } from "../entity/TodoEntity";
import { Todo as DomainObject } from "../../domain/model/Todo";
import { TodoList as FirstClassCollection } from "../../domain/model/TodoList";

export class TodoRepository {
  private repository: Repository<Entity>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(Entity);
  }

  async getTodos(): Promise<FirstClassCollection> {
    const result = await this.repository.find();
    return new FirstClassCollection(
      result.map(
        (entity) =>
          new DomainObject(
            entity.title,
            entity.completed,
            new CreatedAt(entity.createdAt),
            new CompletedAt(entity.completedAt),
            new DueDate(entity.dueDate),
            entity.status,
            entity.id
          )
      )
    );
  }

  async getTodo(id: number): Promise<DomainObject | null> {
    const entity = await this.repository.findOneBy({ id });
    if (entity) {
      return new DomainObject(
        entity.title,
        entity.completed,
        new CreatedAt(entity.createdAt),
        new CompletedAt(entity.completedAt),
        new DueDate(entity.dueDate),
        entity.status,
        entity.id
      );
    } else {
      return null;
    }
  }

  async addTodo(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
    entity.status = todo.Status;

    await this.repository.save(entity);
  }

  async deleteTodo(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
    entity.status = todo.Status;

    const id = todo.Id;
    if (id !== null) {
      entity.id = id;
      await this.repository.remove(entity);
    }
  }

  async updateTodo(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
    entity.status = todo.Status;

    const id = todo.Id;
    if (id !== null) {
      entity.id = id;
      await this.repository.save(entity);
    }
  }
}
