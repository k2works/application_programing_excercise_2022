import { nSQL } from "@nano-sql/core";
import { TodoItemModel } from "../model/TodoItemModel";

export class TodoItemRepository {
  constructor(db, table) {
    this._db = db;
    this._table = table;
  }

  get db() {
    return this._db;
  }

  get table() {
    return this._table;
  }

  setup() {
    return new Promise((resolve, reject) => {
      // Persistent Database
      nSQL()
        .createDatabase({
          id: this.db,
          mode: "PERM",
          tables: [
            {
              name: this.table,
              model: {
                "id:int": { pk: true },
                "title:string": {},
                "completed:boolean": {},
              },
              indexes: {},
            },
          ],
        })
        .then(() => {
          return resolve();
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query("upsert", data)
        .exec()
        .then((rows) => {
          console.log(rows);
          return resolve();
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query("select")
        .exec()
        .then((rows) => {
          console.log(rows);
          const result = rows.map(
            (row) =>
              new TodoItemModel({
                id: row.id,
                title: row.title,
                completed: row.completed,
              })
          );
          return resolve(result);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query("select")
        .where(["id", "=", id])
        .exec()
        .then((rows) => {
          console.log(rows);
          const result = rows.map(
            (row) =>
              new TodoItemModel({
                id: row.id,
                title: row.title,
                completed: row.completed,
              })
          );
          return result[0] === undefined ? resolve(null) : resolve(result[0]);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query("delete")
        .where(["id", "=", id])
        .exec()
        .then((rows) => {
          console.log(rows);
          const result = rows.map(
            (row) =>
              new TodoItemModel({
                id: row.id,
                title: row.title,
                completed: row.completed,
              })
          );
          return resolve(result[0]);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}