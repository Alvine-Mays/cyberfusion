import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleVisitsHit, handleVisitsGet } from "./routes/visits";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Compteur de visites proxy (évite CORS)
  app.get("/api/visits/hit", handleVisitsHit);
  app.get("/api/visits/get", handleVisitsGet);

  return app;
}
