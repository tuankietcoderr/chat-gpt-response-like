const express = require("express");
const app = express();
const cors = require("cors");
const { readFileSync } = require("fs");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/events", (req, res) => {
  console.log("Client connected");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Simulating streaming data

  const message = readFileSync("content.md", "utf-8");
  const words = message;
  const wordCount = words.length;

  let i = 0;

  const intervalId = setInterval(() => {
    if (i < wordCount) {
      sendEvent({
        message: words[i],
        hasMore: i < wordCount - 1,
      });
      i++;
    } else {
      clearInterval(intervalId);
      res.end();
    }
  }, 10);

  // Clean up if client closes connection
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
