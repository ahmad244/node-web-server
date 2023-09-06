import express from "express";

const app = express();

app.use(express.json());


app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/chat-gpt", function (req, res) {
  res.send("calling gpt service");
});

app.post("/echo", function (req, res) {
  // Create an object with selected properties from req
  const reqData = {
    method: req.method,
    body: req.body,
    t: "",
    url: req.url,
    headers: req.headers,
    params: req.params,
  };

  // Stringify the modified object
  res
    .status(200)
    .header({
      "content-type": "application/json",
    })
    .send(JSON.stringify(reqData, null, " "));
});

app.listen(1684);
