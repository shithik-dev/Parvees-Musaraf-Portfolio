import app from "../server/src/app.js";

export default function handler(req, res) {
  const requestPath = req.url === "/" ? "" : req.url;

  if (!requestPath.startsWith("/api")) {
    req.url = `/api${requestPath}`;
  }

  return app(req, res);
}
