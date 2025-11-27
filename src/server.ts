import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { routes } from "./helpers/route-handler";
import sendJSON from "./helpers/send-json";

addRoutes("GET", "/", (req, res) => {
  sendJSON(res, 200, {
    message: "Hello form node js with type script...",
    path: req.url,
  });
});

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(444, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found!!!",
        })
      );
    }

    // root route
    // if (req.url === "/" && req.method === "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello form node js with type script...",
    //       path: req.url,
    //     })
    //   );
    // }

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
      let body = "";

      // listen for data chunk
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(JSON.stringify(body));
          res.end(data);
        } catch (error: any) {
          console.error(error?.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
