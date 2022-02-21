import { getRepository } from "typeorm";
import { Todo as Entity } from "../entity/Todo";
import { Status as StatusEntity } from "../entity/Status";
import { Todo as DomainObject } from "../domain/model/todo/Todo";
import { TodoList as FirstCollection } from "../domain/model/todo/TodoList";
import { CreatedAt } from "../domain/model/todo/CreatedAt";
import { CompletedAt } from "../domain/model/todo/CompletedAt";
import { DueDate } from "../domain/model/todo/DueDate";

export class TodoRepository {
  private async createUpdateStatus(todo: DomainObject): Promise<StatusEntity> {
    const statusEntity = await getRepository(StatusEntity)
      .createQueryBuilder("status")
      .where("status.code = :code", { code: todo.StatusCode })
      .getOne();
    if (statusEntity === undefined) {
      const newStatusEntity = new StatusEntity();
      newStatusEntity.type = todo.StatusType;
      newStatusEntity.code = todo.StatusCode;
      newStatusEntity.name = todo.Status;
      return getRepository(StatusEntity).save(newStatusEntity);
    }
    return statusEntity;
  }

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
    if (entity === undefined) throw new Error("Not Found");
    return new DomainObject(
      entity.title,
      entity.completed,
      new CreatedAt(entity.createdAt),
      new CompletedAt(entity.completedAt),
      new DueDate(entity.dueDate),
      entity.id
    );
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
}
