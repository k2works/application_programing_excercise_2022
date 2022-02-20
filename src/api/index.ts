import app from "./presentation/App";
import swaggerUi from "swagger-ui-express";
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Server is running on port " + app.get("port"));
});
