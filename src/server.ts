import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running...");

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello form node js with type script...",
          path: req.url,
        })
      );
    }

    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health status is okay.",
          path: req.url,
        })
      );
    }

    if (req.url === "/api/users" && req.method === "POST") {
      const user = {
        id: 123,
        name: "Tariqul Islam",
        email: "tariqul@tariqul.dev",
      };

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(user));
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
