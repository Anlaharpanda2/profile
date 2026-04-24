import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import { hashPassword, verifyPassword, createSessionCookie, clearSessionCookie, getSession } from "../lib/auth";
import type { Bindings } from "../lib/types";

const auth = new Hono<{ Bindings: Bindings }>();

auth.post("/login", async (c) => {
  const body = await c.req.json<{ username?: string; password?: string }>();
  const username = (body.username || "").trim();
  const password = body.password || "";
  if (!username || !password) return c.json({ error: "Username and password required" }, 400);

  const db = drizzle(c.env.DB);
  const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const cookie = await createSessionCookie(c.env.SESSION_SECRET, username);
  c.header("Set-Cookie", cookie);
  return c.json({ ok: true, user: { username } });
});

auth.post("/logout", (c) => {
  c.header("Set-Cookie", clearSessionCookie());
  return c.json({ ok: true });
});

auth.get("/me", async (c) => {
  const session = await getSession(c.req.raw, c.env.SESSION_SECRET);
  if (!session) return c.json({ error: "Unauthorized" }, 401);
  return c.json({ user: { username: session.u, exp: session.exp } });
});

// One-time setup: create the admin user if no users exist
auth.post("/setup", async (c) => {
  const db = drizzle(c.env.DB);
  const existing = await db.select().from(usersTable);
  if (existing.length > 0) return c.json({ error: "Already set up" }, 409);

  const body = await c.req.json<{ username?: string; password?: string }>();
  const username = (body.username || "").trim();
  const password = body.password || "";
  if (!username || !password) return c.json({ error: "Username and password required" }, 400);
  if (password.length < 8) return c.json({ error: "Password must be at least 8 characters" }, 400);

  const passwordHash = await hashPassword(password);
  await db.insert(usersTable).values({ username, passwordHash });
  return c.json({ ok: true, message: "Admin user created" }, 201);
});

export default auth;
