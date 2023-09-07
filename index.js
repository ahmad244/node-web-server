import express from "express";
import OpenAI from "openai";
// import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { config } from "dotenv";
config({ path: `${__dirname}/.env` });

const ALLOWED_ORIGINS_URL = process.env.ALLOWED_ORIGINS_URL;

// const express = require("express");
// const OpenAI = require("openai");
// const cors = require("cors");

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("req.headers.origin, req.headers.origin");
  const allowedOrigins = [ALLOWED_ORIGINS_URL];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    console.log("allowedOrigins.includes(origin) == > " + origin);
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, DELETE, POST, GET, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// const corsOpts = {
//   origin: "https://ahmad244.github.io", // Replace with the actual origin of your frontend application
//   methods: ["GET", "POST","REQUEST"],
//   allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOpts));

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
