const express = require("express");
const { validateId, checkResourceExists, handleErrors} = require("./logger");
const {users} = require("./data");
const app = express();
app.use(express.json());




app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/users/:id",validateId,checkResourceExists, (req, res) => {
const user = users.find(u => u.id === parseInt(req.params.id));
if (user) {
    res.send({ user: user });
  }
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).send({ user: newUser });
});

//catch all error handler
app.use(handleErrors);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
