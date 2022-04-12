import { Repository } from "typeorm";
import { CompletedAt } from "../../domain/CompletedAt";
import { CreatedAt } from "../../domain/CreatedAt";
import { DueDate } from "../../domain/DueDate";
import { AppDataSource } from "../data-source";
import { TodoEntity as Entity } from "../entity/TodoEntity";
import { Todo as DomainObject } from "../../domain/Todo";

export class TodoRepository {
  private repository: Repository<Entity>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(Entity);
  }

  async getTodos(): Promise<DomainObject[]> {
    const result = await this.repository.find();
    return result.map(
      (entity) =>
        new DomainObject(
          entity.title,
          entity.completed,
          new CreatedAt(entity.createdAt),
          new CompletedAt(entity.completedAt),
          new DueDate(entity.dueDate),
          entity.id
        )
    );
  }

  async addTodo(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;

    await this.repository.save(entity);
  }

  async deleteTodo(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
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
    const id = todo.Id;
    if (id !== null) {
      entity.id = id;
      await this.repository.save(entity);
    }
  }
}
