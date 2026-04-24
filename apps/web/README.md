# profile-v2

Personal portfolio site for [anla.my.id](https://anla.my.id).

Next.js 16 (SSG via `output: "export"`), Tailwind v4, deployed on Cloudflare Pages. The admin UI reads/writes JSON data files in this repo via Cloudflare Pages Functions, so there is no database.

## Architecture

- **Public pages** (`/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`) are fully static. They import `data/projects.json` and `data/blog.json` at build time.
- **Admin UI** (`/login`, `/admin/*`) is a client-rendered SPA inside the static export. It calls `/api/*` Pages Functions for auth and CRUD.
- **Pages Functions** (`functions/api/*`) handle login, logout, session, and CRUD against GitHub's Contents API. When the admin saves, a commit lands on the repo → Cloudflare auto-rebuilds → live site updates.

```
data/            JSON data files (source of truth for content)
app/             Next.js App Router pages
components/      UI + admin React components
lib/             client/server-shared types and data helpers
functions/       Cloudflare Pages Functions (separate tsconfig)
public/          static assets
```

## Environment variables

Set these in Cloudflare Pages → Settings → Environment Variables (and mirror for Preview if desired):

| Var | Required | Notes |
| --- | --- | --- |
| `LOGIN_USERNAME` | yes | Admin username for `/login` |
| `LOGIN_PASSWORD` | yes | Admin password for `/login` |
| `GITHUB_USERNAME` | yes | GitHub account used as committer |
| `GITHUB_TOKEN` | yes | PAT with **Contents: Read & Write** on this repo. Also used as the session cookie HMAC key. |
| `GITHUB_REPO` | yes | `owner/repo` of this repository, e.g. `itsanla/profile-v2` |
| `GITHUB_BRANCH` | no | Target branch for commits (defaults to the repo's default branch) |

For local `wrangler pages dev`, copy `.env.example` to `.dev.vars` and fill it in.

## Development

```bash
pnpm install
pnpm dev                # Next.js dev server, public pages only
pnpm build              # static export → out/
pnpm exec wrangler pages dev out   # serve built site + run Pages Functions
```

## Deploy (Cloudflare Pages)

1. Connect the GitHub repo in Cloudflare Pages.
2. Build command: `pnpm build`. Output directory: `out`.
3. Set the env vars above (and set the same vars in **Preview** if you use branch deploys).
4. Generate the GitHub PAT with `Contents: Read & Write` on this repo and paste as `GITHUB_TOKEN`.

After deployment, sign in at `/login`, then manage projects at `/admin/projects` and articles at `/admin/blog`.

## How edits become live

1. Admin submits a form → `/api/projects` or `/api/blog` (Pages Function).
2. The function authenticates the cookie, applies the change, and commits the updated JSON back to this repo via the GitHub Contents API.
3. Cloudflare Pages sees the push and triggers a rebuild.
4. The new static export replaces the live site within ~30–60 seconds.
