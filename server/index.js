import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import leadsHandler from "../api/leads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, "api", ".env"), override: false });

const app = express();
const port = Number(process.env.API_PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:8080";

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.all("/api/leads", async (req, res) => {
  try {
    await leadsHandler(req, res);
  } catch (error) {
    console.error("[api] uncaught /api/leads error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    if (!res.headersSent) {
      res.status(500).json({ ok: false, error: `Internal error: ${message}` });
    }
  }
});

app.use((error, _req, res, _next) => {
  console.error("[api] uncaught middleware error:", error);
  const message = error instanceof Error ? error.message : "Internal server error";
  if (!res.headersSent) {
    res.status(500).json({ ok: false, error: `Server error: ${message}` });
  }
});

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
  console.log(`[api] cors origin: ${corsOrigin}`);
});
