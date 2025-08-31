const rateLimit = require("express-rate-limit");
const { posts } = require("./data");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function currentTime(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests
  message: "Too many requests from this IP, please try again later.",
});

const validate = ajv.compile({
  type: "object",
  properties: {
    title: { type: "string", minLength: 5, maxLength: 100 },
    content: { type: "string", minLength: 5, maxLength: 500 },
    category: { type: "string" },
    tags: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ["title", "content", "category", "tags"],
  additionalProperties: false,
});

function validPost(req, res, next) {
  const isValid = validate(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: validate.errors });
  }
  next();
}

module.exports = { currentTime, limiter, validPost };
