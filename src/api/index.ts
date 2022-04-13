import express from "express";
import cors from "cors";
import { AppDataSource } from "./infrastructure/data-source";
import router from "./presentaion/TodoController";
import swaggerUi from "swagger-ui-express";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

AppDataSource.initialize()
  .then(() => {
    app.use("/api", router);
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
