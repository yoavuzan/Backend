const { error } = require("console");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

console.log(path.join(__dirname, "dist"));
app.use(express.static(path.join(__dirname, "dist")));

const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];

app.get("/priceCheck/:name", function (req, res) {
  const price = store.find((item) => item.name === req.params.name)?.price;
  res.send(price ? { price } : { price: null });
});

app.get("/buy/:name", (req, res) => {
  const item = store.find((item) => item.name === req.params.name);

  if (item) {
    if (item.inventory > 0) {
      item.inventory -= 1;
      return res.json(item);
    } else {
      return res.json({ error: "Item out of stock" });
    }
  } else {
    return res.json({ error: "Sorry, could not find your item" });
  }
});
app.get("/sale", function (req, res) {
  const objParm = req.query;
  if (objParm.admin === "true") {
    const newstore = store.map((item) => {
      if (item.inventory > 10) {
        item.price *= 0.5;
      }
      return item;
    });
    res.json(newstore)
  }
  res.json({ error: "Sorry, cann't give you admin acsess" });

});

app.listen(port, function () {
  console.log(`Server is up and running smoothly`);
});
