import parseBody from "../helpers/parse-body";
import addRoutes from "../helpers/route-handler";
import sendJSON from "../helpers/send-json";

addRoutes("GET", "/", (req, res) => {
  sendJSON(res, 200, {
    message: "Hello form node js with type script...",
    path: req.url,
  });
});

addRoutes("GET", "/api", (req, res) => {
  sendJSON(res, 200, {
    message: "This is api route for check health status.",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  sendJSON(res, 201, body);
});
