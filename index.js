import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/chat-gpt", function (req, res) {
  res.send("calling gpt service");
});

app.get("/echo", function (req, res) {
  res.send(JSON.stringify(req, null, " "));
});

app.listen(8080);
