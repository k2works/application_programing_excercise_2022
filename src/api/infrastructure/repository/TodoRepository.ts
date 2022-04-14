import { Repository as ORMRepository } from "typeorm";
import { CompletedAt } from "../../domain/model/CompletedAt";
import { CreatedAt } from "../../domain/model/CreatedAt";
import { DueDate } from "../../domain/model/DueDate";
import { AppDataSource } from "../data-source";
import { TodoEntity as Entity } from "../entity/TodoEntity";
import { Todo as DomainObject } from "../../domain/model/Todo";
import { TodoList as FirstClassCollection } from "../../domain/model/TodoList";
import { StatusEntity } from "../entity/StatusEntity";
import { Repository } from "./Repository";

export class TodoRepository implements Repository<DomainObject, FirstClassCollection> {
  private repository: ORMRepository<Entity>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(Entity);
  }

  private async createUpdateStatus(
    todo: DomainObject
  ): Promise<StatusEntity | null> {
    const repository = AppDataSource.manager.getRepository(StatusEntity);
    const statusEntity = await repository
      .createQueryBuilder("status")
      .where("status.code = :code", { code: todo.StatusCode })
      .getOne();
    if (statusEntity === undefined || statusEntity === null) {
      const newStatusEntity = new StatusEntity();
      newStatusEntity.type = todo.StatusType;
      newStatusEntity.code = todo.StatusCode;
      newStatusEntity.name = todo.Status;
      return repository.save(newStatusEntity);
    } else {
      return statusEntity;
    }
  }

  async getAll(): Promise<FirstClassCollection> {
    const result = await this.repository.find({ relations: ["status"] });
    return new FirstClassCollection(
      result.map((entity) =>
        DomainObject.create({
          title: entity.title,
          completed: entity.completed,
          createdAt: new CreatedAt(entity.createdAt),
          completedAt: new CompletedAt(entity.completedAt),
          dueDate: new DueDate(entity.dueDate),
          id: entity.id,
        })
      )
    );
  }

  async get(id: number): Promise<DomainObject> {
    const entity = await this.repository.findOneBy({ id });
    if (entity === undefined || entity === null) throw new Error("Not found");
    return DomainObject.create({
      title: entity.title,
      completed: entity.completed,
      createdAt: new CreatedAt(entity.createdAt),
      completedAt: new CompletedAt(entity.completedAt),
      dueDate: new DueDate(entity.dueDate),
      id: entity.id,
    });
  }

  async add(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
    const result = await this.createUpdateStatus(todo);
    if (result) entity.status = result;

    await this.repository.save(entity);
  }

  async delete(todo: DomainObject): Promise<void> {
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

  async update(todo: DomainObject): Promise<void> {
    const entity = new Entity();
    entity.title = todo.Title;
    entity.completed = todo.Completed;
    entity.createdAt = todo.CreatedAt;
    entity.completedAt = todo.CompletedAt;
    entity.dueDate = todo.DueDate;
    const result = await this.createUpdateStatus(todo);
    if (result) entity.status = result;

    const id = todo.Id;
    if (id !== null) {
      entity.id = id;
      await this.repository.save(entity);
    }
  }
}
