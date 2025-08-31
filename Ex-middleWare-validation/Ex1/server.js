const express = require("express");
const { returnCurrentTime } = require("./logger");

const app = express();
app.use(express.json());
app.use(returnCurrentTime)


app.get("/", (req, res) => {
  res.send({message:"welcome!",requestCount: req.requestCount});
});

app.get("/about", (req, res) => {
  res.send({ message: "about!", requestCount: req.requestCount });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});