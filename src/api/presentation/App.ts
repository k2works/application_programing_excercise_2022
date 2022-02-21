import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import router from "./Route";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

createConnection()
  .then(async () => {
    app.use("/api", router);
  })
  .catch((error) => console.log(error));

export default app;
