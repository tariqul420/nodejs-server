import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { routes } from "./helpers/route-handler";
import "./routes";

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
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
