import { getRepository } from "typeorm";
import { Todo as Entity, Status as StatusEntity } from "../entity/Todo";
import {
  Todo as DomainObject,
  TodoList as FirstCollection,
} from "../domain/Todo";
import { CreatedAt } from "../domain/CreatedAt";
import { CompletedAt } from "../domain/CompletedAt";
import { DueDate } from "../domain/DueDate";

export class TodoRepository {
  async getTodos(): Promise<FirstCollection> {
    const result = await getRepository(Entity).find({ relations: ["status"] });
    return new FirstCollection(
      result.map(
        (entity) =>
          new DomainObject(
            entity.title,
            entity.completed,
            new CreatedAt(entity.createdAt),
            new CompletedAt(entity.completedAt),
            new DueDate(entity.dueDate),
            entity.id
          )
      )
    );
  }

  async getTodo(id: number): Promise<DomainObject> {
    const entity = await getRepository(Entity).findOne(id, {
      relations: ["status"],
    });
    if (entity !== undefined) {
      return new DomainObject(
        entity.title,
        entity.completed,
        new CreatedAt(entity.createdAt),
        new CompletedAt(entity.completedAt),
        new DueDate(entity.dueDate),
        entity.id
      );
    } else {
      return new DomainObject("", false);
    }
  }

  async addTodo(todo: DomainObject): Promise<void> {
    const entiry = new Entity();
    entiry.title = todo.Title;
    entiry.completed = todo.Completed;
    entiry.createdAt = todo.CreatedAt;
    entiry.completedAt = todo.CompletedAt;
    entiry.dueDate = todo.DueDate;
    entiry.status = await this.createUpdateStatus(todo);

    await getRepository(Entity).save(entiry);
  }

  async deleteTodo(todo: DomainObject): Promise<void> {
    const entiry = new Entity();
    entiry.title = todo.Title;
    entiry.completed = todo.Completed;
    entiry.createdAt = todo.CreatedAt;
    entiry.completedAt = todo.CompletedAt;
    entiry.dueDate = todo.DueDate;
    const id = todo.Id;
    if (id !== null) {
      entiry.id = id;
      await getRepository(Entity).remove(entiry);
    }
  }

  async updateTodo(todo: DomainObject): Promise<void> {
    const entiry = new Entity();
    entiry.title = todo.Title;
    entiry.completed = todo.Completed;
    entiry.createdAt = todo.CreatedAt;
    entiry.completedAt = todo.CompletedAt;
    entiry.dueDate = todo.DueDate;
    entiry.status = await this.createUpdateStatus(todo);

    const id = todo.Id;
    if (id !== null) {
      entiry.id = id;
      await getRepository(Entity).save(entiry);
    }
  }

  async count(): Promise<number> {
    return getRepository(Entity).count();
  }

  private async createUpdateStatus(todo: DomainObject): Promise<StatusEntity> {
    const statusEntity = await getRepository(StatusEntity)
      .createQueryBuilder("status")
      .where("status.code = :code", { code: todo.StatusCode })
      .getOne();
    if (statusEntity === undefined) {
      const newStatusEntity = new StatusEntity();
      newStatusEntity.code = todo.StatusCode;
      newStatusEntity.name = todo.Status;
      return await getRepository(StatusEntity).save(newStatusEntity);
    }
    return statusEntity;
  }
}
