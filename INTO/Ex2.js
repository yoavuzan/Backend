const http = require("http");

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const server = http.createServer((request, response) => {
  const [, api, usersPath, idParam] = request.url.split("/");

  // --- GET Routes ---
  if (request.method === "GET") {
    if (api === "api" && usersPath === "users" && !idParam) {
      // GET all users
      response.writeHead(200, { "Content-Type": "application/json" });
      return response.end(JSON.stringify(users)); // return here
    } else if (api === "api" && usersPath === "users" && idParam) {
      // GET single user
      const id = idParam.replace(":", "");
      const user = users.find((u) => u.id === parseInt(id));
      if (user) {
        response.writeHead(200, { "Content-Type": "application/json" });
        return response.end(JSON.stringify(user)); // return here
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        return response.end(JSON.stringify({ error: "User Not Found" })); // return here
      }
    }
  }

  // --- POST Routes ---
  if (request.method === "POST") {
    if (api === "api" && usersPath === "users" && !idParam) {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        try {
          const newUser = JSON.parse(body);
          newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
          users.push(newUser);

          response.writeHead(201, { "Content-Type": "application/json" });
          return response.end(JSON.stringify(newUser)); // return here
        } catch (err) {
          response.writeHead(400, { "Content-Type": "application/json" });
          return response.end(JSON.stringify({ error: "Invalid JSON" })); // return here
        }
      });
      return; // prevent fallback 404
    }
  }

  // --- Fallback for unknown routes ---
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Route Not Found" }));
});

const port = 3000;
server.listen(port, () => {
  console.log(`Node server running at http://localhost:${port}`);
});
