import app from "./src/api/index";

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Server is running on port " + app.get("port"));
});
