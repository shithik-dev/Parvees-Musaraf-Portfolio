import app from "../server/src/app.js";

export default function handler(req, res) {
  // Vercel may strip the /api function prefix before invoking Express.
  if (!req.url.startsWith("/api")) {
    req.url = `/api${req.url === "/" ? "" : req.url}`;
  }

  return app(req, res);
}
