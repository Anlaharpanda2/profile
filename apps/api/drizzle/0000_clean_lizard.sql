CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`date` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`author` text DEFAULT 'anla' NOT NULL,
	`thumbnail` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`num` text DEFAULT '01' NOT NULL,
	`title` text NOT NULL,
	`tagline` text DEFAULT '' NOT NULL,
	`year` integer DEFAULT 2025 NOT NULL,
	`image` text DEFAULT '' NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`categories` text DEFAULT '[]' NOT NULL,
	`stack` text DEFAULT '[]' NOT NULL,
	`problem` text DEFAULT '' NOT NULL,
	`impact` text DEFAULT '[]' NOT NULL,
	`demo_link` text DEFAULT '' NOT NULL,
	`github_link` text DEFAULT '' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`duration` text DEFAULT '' NOT NULL,
	`metrics_performance` text DEFAULT '' NOT NULL,
	`metrics_users` integer DEFAULT 0 NOT NULL,
	`learnings` text DEFAULT '[]' NOT NULL,
	`visual_bg` text DEFAULT '' NOT NULL,
	`visual_label` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);