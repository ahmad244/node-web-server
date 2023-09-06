import express from "express";
import OpenAI from "openai";
import cors from "cors";

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();

app.use(express.json());

const corsOpts = {
  origin: "http://poc-takamol.com:3000", // Replace with the actual origin of your frontend application
  methods: ["GET", "POST","REQUEST"],
  allowedHeaders: ["Content-Type"],
};


app.use(cors(corsOpts));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/chat-gpt", async function (req, res) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [...req.body.messages],
      model: "gpt-3.5-turbo",
    });

    if (chatCompletion.choices && chatCompletion.choices.length > 0) {
      console.log(chatCompletion.choices[0]);
      res
        .status(200)
        .header({
          "content-type": "application/json",
        })
        .send(JSON.stringify(chatCompletion, null, " "));
    } else {
      res.status(500).send("Chat completion failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
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
