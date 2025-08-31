const express = require("express");
const { currentTime, limiter, validPost } = require("./logger");
const {posts} = require("./data");
const app = express();

//middleware
app.use(limiter);
app.use(currentTime);
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", validPost, (req, res) => {
console.log("Creating a new post:", req.body);
  const newPost = {Id: posts.length + 1, ...req.body};
  posts.push(newPost);
  res.status(201).send(newPost);
});

// app.post("/posts/:postId/comments", (req, res) => {
//   const post = posts.find(p => p.Id === parseInt(req.params.postId));
//   if (!post) {
//     return res.status(404).send({ message: "Post not found" });
//   }
//   const newComment = { Id: post.comments.length + 1, ...req.body };
//   post.comments.push(newComment);
//   res.status(201).send(newComment);
// });

// app.get("/posts/:postId/comments", (req, res) => {
//   const post = posts.find(p => p.Id === parseInt(req.params.postId));
//   if (!post) {
//     return res.status(404).send({ message: "Post not found" });
//   }
//   res.send(post.comments);
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
