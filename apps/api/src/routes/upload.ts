import { Hono } from "hono";
import { getSession } from "../lib/auth";
import type { Bindings } from "../lib/types";

const upload = new Hono<{ Bindings: Bindings }>();

// POST /api/upload — upload file to R2 (protected)
upload.post("/", async (c) => {
  const session = await getSession(c.req.raw, c.env.SESSION_SECRET);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const form = await c.req.formData();
  const file = form.get("file") as File | null;
  if (!file) return c.json({ error: "No file provided" }, 400);

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type)) return c.json({ error: "File type not allowed" }, 400);

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) return c.json({ error: "File too large (max 10 MB)" }, 400);

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  await c.env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  const publicUrl = `${c.env.R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  return c.json({ url: publicUrl }, 201);
});

export default upload;
