import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { projectsTable } from "../db/schema";
import { getSession } from "../lib/auth";
import { rowToProject, validateProject } from "../lib/db-mappers";
import type { Bindings, Project } from "../lib/types";

const projects = new Hono<{ Bindings: Bindings }>();

async function requireAuth(c: { req: { raw: Request }; env: Bindings; json: (d: unknown, s: number) => Response }) {
  const session = await getSession(c.req.raw, c.env.SESSION_SECRET);
  return session;
}

// GET /api/projects — public list
projects.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.select().from(projectsTable).orderBy(projectsTable.num);
  return c.json({ data: rows.map(rowToProject) });
});

// GET /api/projects/:slug — public detail
projects.get("/:slug", async (c) => {
  const db = drizzle(c.env.DB);
  const [row] = await db.select().from(projectsTable).where(eq(projectsTable.slug, c.req.param("slug")));
  if (!row) return c.json({ error: "Project not found" }, 404);
  return c.json({ data: rowToProject(row) });
});

// POST /api/projects — create (protected)
projects.post("/", async (c) => {
  const session = await requireAuth(c as Parameters<typeof requireAuth>[0]);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json<Partial<Project>>();
  const validated = validateProject(body, "create");
  if (typeof validated === "string") return c.json({ error: validated }, 400);

  const db = drizzle(c.env.DB);
  const existing = await db.select({ slug: projectsTable.slug }).from(projectsTable).where(eq(projectsTable.slug, validated.slug));
  if (existing.length > 0) return c.json({ error: "A project with that slug already exists" }, 409);

  await db.insert(projectsTable).values({
    slug: validated.slug,
    num: validated.num,
    title: validated.title,
    tagline: validated.tagline,
    year: validated.year,
    image: validated.image,
    role: validated.role,
    tags: JSON.stringify(validated.tags),
    categories: JSON.stringify(validated.categories),
    stack: JSON.stringify(validated.stack),
    problem: validated.problem,
    impact: JSON.stringify(validated.impact),
    demoLink: validated.demoLink,
    githubLink: validated.githubLink,
    featured: validated.featured,
    duration: validated.duration,
    metricsPerformance: validated.metrics.performance,
    metricsUsers: validated.metrics.users,
    learnings: JSON.stringify(validated.learnings),
    visualBg: validated.visual.bg,
    visualLabel: validated.visual.label,
  });

  return c.json({ data: validated }, 201);
});

// PUT /api/projects/:slug — update (protected)
projects.put("/:slug", async (c) => {
  const session = await requireAuth(c as Parameters<typeof requireAuth>[0]);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const slug = c.req.param("slug");
  const db = drizzle(c.env.DB);
  const [existing] = await db.select().from(projectsTable).where(eq(projectsTable.slug, slug));
  if (!existing) return c.json({ error: "Project not found" }, 404);

  const body = await c.req.json<Partial<Project>>();
  const validated = validateProject({ ...body, slug }, "update");
  if (typeof validated === "string") return c.json({ error: validated }, 400);

  await db.update(projectsTable).set({
    num: validated.num,
    title: validated.title,
    tagline: validated.tagline,
    year: validated.year,
    image: validated.image,
    role: validated.role,
    tags: JSON.stringify(validated.tags),
    categories: JSON.stringify(validated.categories),
    stack: JSON.stringify(validated.stack),
    problem: validated.problem,
    impact: JSON.stringify(validated.impact),
    demoLink: validated.demoLink,
    githubLink: validated.githubLink,
    featured: validated.featured,
    duration: validated.duration,
    metricsPerformance: validated.metrics.performance,
    metricsUsers: validated.metrics.users,
    learnings: JSON.stringify(validated.learnings),
    visualBg: validated.visual.bg,
    visualLabel: validated.visual.label,
    updatedAt: new Date().toISOString(),
  }).where(eq(projectsTable.slug, slug));

  return c.json({ data: validated });
});

// DELETE /api/projects/:slug — delete (protected)
projects.delete("/:slug", async (c) => {
  const session = await requireAuth(c as Parameters<typeof requireAuth>[0]);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const slug = c.req.param("slug");
  const db = drizzle(c.env.DB);
  const [existing] = await db.select({ slug: projectsTable.slug }).from(projectsTable).where(eq(projectsTable.slug, slug));
  if (!existing) return c.json({ error: "Project not found" }, 404);

  await db.delete(projectsTable).where(eq(projectsTable.slug, slug));
  return c.json({ ok: true });
});

export default projects;
