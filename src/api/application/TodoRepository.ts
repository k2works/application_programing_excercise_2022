import { getRepository } from "typeorm";
import { Todo as Entity } from "../entity/Todo";
import { Todo as DomainObject } from "../domain/Todo";
import { TodoList as FirstCollection } from "../domain/TodoList";
import { CreatedAt } from "../domain/CreatedAt";
import { CompletedAt } from "../domain/CompletedAt";
import { DueDate } from "../domain/DueDate";

export class TodoRepository {
  async getTodos(): Promise<FirstCollection> {
    const result = await getRepository(Entity).find();
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
    const entity = await getRepository(Entity).findOne(id);
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
    const id = todo.Id;
    if (id !== null) {
      entiry.id = id;
      await getRepository(Entity).save(entiry);
    }
  }
}
