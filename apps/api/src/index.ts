import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Bindings } from "./lib/types";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import blogRoutes from "./routes/blog";
import uploadRoutes from "./routes/upload";
import seedRoutes from "./routes/seed";

const app = new Hono<{ Bindings: Bindings }>();

// CORS — must be first, handles preflight
app.use("*", async (c, next) => {
  const origin = c.env.FRONTEND_URL || "*";
  return cors({
    origin,
    allowHeaders: ["Content-Type", "Cookie", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true,
    maxAge: 86400,
  })(c, next);
});

app.route("/api/auth", authRoutes);
app.route("/api/projects", projectRoutes);
app.route("/api/blog", blogRoutes);
app.route("/api/upload", uploadRoutes);
app.route("/api/seed", seedRoutes);

app.get("/", (c) => c.json({ service: "anla-api", status: "ok" }));

export default app;
