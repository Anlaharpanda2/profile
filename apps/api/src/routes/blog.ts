import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq, desc } from "drizzle-orm";
import { blogPostsTable } from "../db/schema";
import { getSession } from "../lib/auth";
import { rowToBlog, validateBlog } from "../lib/db-mappers";
import type { Bindings, BlogPost } from "../lib/types";

const blog = new Hono<{ Bindings: Bindings }>();

async function requireAuth(c: { req: { raw: Request }; env: Bindings }) {
  return getSession(c.req.raw, c.env.SESSION_SECRET);
}

// GET /api/blog — public list (newest first)
blog.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.date));
  return c.json({ data: rows.map(rowToBlog) });
});

// GET /api/blog/:slug — public detail
blog.get("/:slug", async (c) => {
  const db = drizzle(c.env.DB);
  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, c.req.param("slug")));
  if (!row) return c.json({ error: "Post not found" }, 404);
  return c.json({ data: rowToBlog(row) });
});

// POST /api/blog — create (protected)
blog.post("/", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json<Partial<BlogPost>>();
  const validated = validateBlog(body, "create");
  if (typeof validated === "string") return c.json({ error: validated }, 400);

  const db = drizzle(c.env.DB);
  const existing = await db.select({ slug: blogPostsTable.slug }).from(blogPostsTable).where(eq(blogPostsTable.slug, validated.slug));
  if (existing.length > 0) return c.json({ error: "A post with that slug already exists" }, 409);

  await db.insert(blogPostsTable).values({
    slug: validated.slug,
    title: validated.title,
    description: validated.description,
    date: validated.date,
    tags: JSON.stringify(validated.tags),
    author: validated.author,
    thumbnail: validated.thumbnail,
    content: validated.content,
  });

  return c.json({ data: validated }, 201);
});

// PUT /api/blog/:slug — update (protected)
blog.put("/:slug", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const slug = c.req.param("slug");
  const db = drizzle(c.env.DB);
  const [existing] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, slug));
  if (!existing) return c.json({ error: "Post not found" }, 404);

  const body = await c.req.json<Partial<BlogPost>>();
  const validated = validateBlog({ ...body, slug }, "update");
  if (typeof validated === "string") return c.json({ error: validated }, 400);

  await db.update(blogPostsTable).set({
    title: validated.title,
    description: validated.description,
    date: validated.date,
    tags: JSON.stringify(validated.tags),
    author: validated.author,
    thumbnail: validated.thumbnail,
    content: validated.content,
    updatedAt: new Date().toISOString(),
  }).where(eq(blogPostsTable.slug, slug));

  return c.json({ data: validated });
});

// DELETE /api/blog/:slug — delete (protected)
blog.delete("/:slug", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const slug = c.req.param("slug");
  const db = drizzle(c.env.DB);
  const [existing] = await db.select({ slug: blogPostsTable.slug }).from(blogPostsTable).where(eq(blogPostsTable.slug, slug));
  if (!existing) return c.json({ error: "Post not found" }, 404);

  await db.delete(blogPostsTable).where(eq(blogPostsTable.slug, slug));
  return c.json({ ok: true });
});

export default blog;
