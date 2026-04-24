import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const projectsTable = sqliteTable("projects", {
  id: int().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  num: text().notNull().default("01"),
  title: text().notNull(),
  tagline: text().notNull().default(""),
  year: int().notNull().default(2025),
  image: text().notNull().default(""),
  role: text().notNull().default(""),
  tags: text().notNull().default("[]"),
  categories: text().notNull().default("[]"),
  stack: text().notNull().default("[]"),
  problem: text().notNull().default(""),
  impact: text().notNull().default("[]"),
  demoLink: text("demo_link").notNull().default(""),
  githubLink: text("github_link").notNull().default(""),
  featured: int({ mode: "boolean" }).notNull().default(false),
  duration: text().notNull().default(""),
  metricsPerformance: text("metrics_performance").notNull().default(""),
  metricsUsers: int("metrics_users").notNull().default(0),
  learnings: text().notNull().default("[]"),
  visualBg: text("visual_bg").notNull().default(""),
  visualLabel: text("visual_label").notNull().default(""),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const blogPostsTable = sqliteTable("blog_posts", {
  id: int().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text().notNull().default(""),
  date: text().notNull().$defaultFn(() => new Date().toISOString()),
  tags: text().notNull().default("[]"),
  author: text().notNull().default("anla"),
  thumbnail: text().notNull().default(""),
  content: text().notNull().default(""),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});
