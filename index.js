import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});


app.get("/chat-gpt", function (req, res) {
    res.send("calling gpt service");
  });

app.listen(8080);