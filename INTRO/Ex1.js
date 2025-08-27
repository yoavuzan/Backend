const http = require("http");

const server = http.createServer((request, response) => {
  let statusCode = 200;
  let message = "";

  if (request.method === "GET") {
    switch (request.url) {
      case "/":
        message = "Welcome to my Server !";
        break;

      case "/about":
        message = "This is the about page";
        break;

      case "/contact":
        message = "Yoav Uzan";
        break;

      default:
        statusCode = 404;
        message = "404 Page Not Found";
        break;
    }
  }

  // send only once
  response.writeHead(statusCode, { "Content-Type": "text/plain" });
  response.end(message);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Node server running at http://localhost:${port}`);
});
