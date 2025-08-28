const express = require("express");
const app = express();

app.use(express.json());
wordCounter = { hi: 7 };

app.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});
app.get("/:word", (req, res) => {
  const { word } = req.params;
  res.send({ count: wordCounter[word] || 0 });
});

app.post("/word", (req, res) => {
  const { word } = req.body;
  wordCounter[word] = (wordCounter[word] || 0) + 1;
  res.send({ text: `Added ${word}, currentCount: ${wordCounter[word]}}` });
});

app.post("/sentence", (req, res) => {
  const { sentence } = req.body;
  let wordExist = 0;
  let wordNotExist = 0;
  sentence.split(" ").forEach((word) => {
    wordCounter[word] = (wordCounter[word] || 0) + 1;
    if (wordCounter[word] === 1) {
      wordNotExist++;
    } else {
      wordExist++;
    }
  });
  res.send({ text: `Added ${wordNotExist} words, ${wordExist} already existed` });
});

app.delete("/:word", (req, res) => {
  const { word } = req.params;
  if (wordCounter[word]) {
    delete wordCounter[word];
    res.status(200).send({ text: `Deleted ${word}` });
  } else {
    res.status(404).send({ text: `${word} does not exist` });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
