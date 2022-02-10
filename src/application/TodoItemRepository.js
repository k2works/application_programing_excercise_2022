import { nSQL } from "@nano-sql/core";

export class TodoItemRepository {
  constructor() {}

  setup() {
    return new Promise((resolve, reject) => {
      // Persistent Database
      nSQL()
        .createDatabase({
          id: "test",
          mode: "PERM",
          tables: [
            {
              name: "users",
              model: {
                "id:int": { pk: true },
                "name:string": {},
                "age:int": {},
                "meta:obj": {
                  model: {
                    "color:string": {},
                  },
                },
                "tags:string[]": { default: [] },
              },
              indexes: {
                "tags:string[]": {},
                "meta.color:string": {},
                "age:int": {},
              },
            },
          ],
        })
        .then(() => {
          return resolve();
        })
        .catch(() => {
          return reject();
        });
    });
  }

  create(list) {
    return new Promise((resolve, reject) => {
      nSQL("users")
        .query("upsert", {
          name: "Jeb",
          age: 20,
          meta: { color: "blue" },
          tags: ["some", "tags", "here"],
        })
        .exec()
        .then((rows) => {
          console.log(rows);
          return resolve();
        });
    });
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      nSQL("users")
        .query("select")
        .exec()
        .then((rows) => {
          console.log(rows);
          return resolve(rows);
        });
    });
  }
}