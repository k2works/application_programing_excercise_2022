import express from "express";
import { Fibonacci } from "./domain/fibonacci";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const fib = new Fibonacci();
  res.send(fib.greeting());
});

module.exports = app;
