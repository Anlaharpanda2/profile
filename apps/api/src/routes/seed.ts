import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { projectsTable, blogPostsTable } from "../db/schema";
import { getSession } from "../lib/auth";
import { validateProject, validateBlog } from "../lib/db-mappers";
import type { Bindings, Project, BlogPost } from "../lib/types";

const seed = new Hono<{ Bindings: Bindings }>();

// POST /api/seed — seed all data from request body (protected, one-time use)
seed.post("/", async (c) => {
  const session = await getSession(c.req.raw, c.env.SESSION_SECRET);
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json<{ projects?: unknown[]; blog?: unknown[] }>();
  const db = drizzle(c.env.DB);

  const projectResults: string[] = [];
  const blogResults: string[] = [];

  if (Array.isArray(body.projects)) {
    for (const item of body.projects) {
      const validated = validateProject(item as Partial<Project>, "create");
      if (typeof validated === "string") { projectResults.push(`SKIP ${(item as { slug?: string }).slug}: ${validated}`); continue; }
      try {
        await db.insert(projectsTable).values({
          slug: validated.slug, num: validated.num, title: validated.title,
          tagline: validated.tagline, year: validated.year, image: validated.image,
          role: validated.role, tags: JSON.stringify(validated.tags),
          categories: JSON.stringify(validated.categories), stack: JSON.stringify(validated.stack),
          problem: validated.problem, impact: JSON.stringify(validated.impact),
          demoLink: validated.demoLink, githubLink: validated.githubLink,
          featured: validated.featured, duration: validated.duration,
          metricsPerformance: validated.metrics.performance, metricsUsers: validated.metrics.users,
          learnings: JSON.stringify(validated.learnings),
          visualBg: validated.visual.bg, visualLabel: validated.visual.label,
        }).onConflictDoNothing();
        projectResults.push(`OK ${validated.slug}`);
      } catch (e) { projectResults.push(`ERR ${validated.slug}: ${String(e)}`); }
    }
  }

  if (Array.isArray(body.blog)) {
    for (const item of body.blog) {
      const validated = validateBlog(item as Partial<BlogPost>, "create");
      if (typeof validated === "string") { blogResults.push(`SKIP ${(item as { slug?: string }).slug}: ${validated}`); continue; }
      try {
        await db.insert(blogPostsTable).values({
          slug: validated.slug, title: validated.title, description: validated.description,
          date: validated.date, tags: JSON.stringify(validated.tags),
          author: validated.author, thumbnail: validated.thumbnail, content: validated.content,
        }).onConflictDoNothing();
        blogResults.push(`OK ${validated.slug}`);
      } catch (e) { blogResults.push(`ERR ${validated.slug}: ${String(e)}`); }
    }
  }

  return c.json({ projects: projectResults, blog: blogResults });
});

export default seed;
