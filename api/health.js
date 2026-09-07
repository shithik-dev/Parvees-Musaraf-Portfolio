import app from "../server/src/app.js";

export default function handler(req, res) {
  req.url = `/api/health${req.url === "/" ? "" : req.url}`;
  return app(req, res);
}
