-- Drop old placeholder table
DROP TABLE IF EXISTS `users_table`;

-- Admin users
CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `username` text NOT NULL UNIQUE,
  `password_hash` text NOT NULL,
  `created_at` text NOT NULL DEFAULT (datetime('now'))
);

-- Projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `slug` text NOT NULL UNIQUE,
  `num` text NOT NULL DEFAULT '01',
  `title` text NOT NULL,
  `tagline` text NOT NULL DEFAULT '',
  `year` integer NOT NULL DEFAULT 2025,
  `image` text NOT NULL DEFAULT '',
  `role` text NOT NULL DEFAULT '',
  `tags` text NOT NULL DEFAULT '[]',
  `categories` text NOT NULL DEFAULT '[]',
  `stack` text NOT NULL DEFAULT '[]',
  `problem` text NOT NULL DEFAULT '',
  `impact` text NOT NULL DEFAULT '[]',
  `demo_link` text NOT NULL DEFAULT '',
  `github_link` text NOT NULL DEFAULT '',
  `featured` integer NOT NULL DEFAULT 0,
  `duration` text NOT NULL DEFAULT '',
  `metrics_performance` text NOT NULL DEFAULT '',
  `metrics_users` integer NOT NULL DEFAULT 0,
  `learnings` text NOT NULL DEFAULT '[]',
  `visual_bg` text NOT NULL DEFAULT '',
  `visual_label` text NOT NULL DEFAULT '',
  `created_at` text NOT NULL DEFAULT (datetime('now')),
  `updated_at` text NOT NULL DEFAULT (datetime('now'))
);

-- Blog posts
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `slug` text NOT NULL UNIQUE,
  `title` text NOT NULL,
  `description` text NOT NULL DEFAULT '',
  `date` text NOT NULL DEFAULT (datetime('now')),
  `tags` text NOT NULL DEFAULT '[]',
  `author` text NOT NULL DEFAULT 'anla',
  `thumbnail` text NOT NULL DEFAULT '',
  `content` text NOT NULL DEFAULT '',
  `created_at` text NOT NULL DEFAULT (datetime('now')),
  `updated_at` text NOT NULL DEFAULT (datetime('now'))
);
