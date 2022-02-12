import { getRepository } from "typeorm";
import { Todo as Entity } from "../entity/Todo";
import { Todo as DomainObject } from "../domain/Todo";
import { CreatedAt } from "../domain/CreatedAt";
import { CompletedAt } from "../domain/CompletedAt";
import { DueDate } from "../domain/DueDate";

export class TodoRepository {
  constructor() {}

  async getTodos(): Promise<DomainObject[]> {
    const result = await getRepository(Entity).find();
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
    const entiry = new Entity();
    entiry.title = todo.getTitle();
    entiry.completed = todo.getCompleted();
    entiry.createdAt = todo.getCreatedAt();
    entiry.completedAt = todo.getCompletedAt();
    entiry.dueDate = todo.getDueDate();

    await getRepository(Entity).save(entiry);
  }

  async deleteTodo(todo: DomainObject): Promise<void> {
    const entiry = new Entity();
    entiry.title = todo.getTitle();
    entiry.completed = todo.getCompleted();
    entiry.createdAt = todo.getCreatedAt();
    entiry.completedAt = todo.getCompletedAt();
    entiry.dueDate = todo.getDueDate();
    const id = todo.getId();
    if (id !== null) {
      entiry.id = id;
      await getRepository(Entity).remove(entiry);
    }
  }

  async updateTodo(todo: DomainObject): Promise<void> {
    const entiry = new Entity();
    entiry.title = todo.getTitle();
    entiry.completed = todo.getCompleted();
    entiry.createdAt = todo.getCreatedAt();
    entiry.completedAt = todo.getCompletedAt();
    entiry.dueDate = todo.getDueDate();
    const id = todo.getId();
    if (id !== null) {
      entiry.id = id;
      await getRepository(Entity).save(entiry);
    }
  }
}
