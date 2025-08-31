const users = require("./data");

function validateId(req, res, next) {
  const userId = parseInt(req.params.id);
  if (userId != "") {
    if (!userId || userId < 1) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
  }
  next();
}

function checkResourceExists(req, res, next) {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    throw res.status(404).send({ message: "User not found" });
  }
  req.user = user;
  next();
}

function handleErrors(err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Internal Server Error", error: err.message });
}

module.exports = { validateId, checkResourceExists, handleErrors };
