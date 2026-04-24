import { getSession } from "./auth";
import type { Env } from "./env";
import { requireEnv } from "./env";
import { readJsonFile, writeJsonFile } from "./github";
import { fail, json } from "./response";

type HasSlug = { slug: string };

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{0,80}$/.test(slug);
}

interface CrudConfig<T extends HasSlug> {
  /** Path of the JSON file in the repo, e.g. "data/projects.json". */
  path: string;
  /** Human label for commit messages, e.g. "project" or "article". */
  kind: string;
  /** Optional normalizer/validator. Returns the cleaned record or a string error. */
  validate?: (item: Partial<T>, mode: "create" | "update") => T | string;
  /** Optional: order/sort entries before writing. */
  sort?: (a: T, b: T) => number;
}

async function requireAuth(
  request: Request,
  env: Env,
): Promise<Response | null> {
  try {
    requireEnv(env);
  } catch (e) {
    return fail(500, e instanceof Error ? e.message : "Server misconfigured");
  }
  const session = await getSession(request, env);
  if (!session) return fail(401, "Unauthorized");
  return null;
}

export function makeCollectionHandlers<T extends HasSlug>(
  cfg: CrudConfig<T>,
) {
  const onGet: PagesFunction<Env> = async ({ request, env }) => {
    const unauth = await requireAuth(request, env);
    if (unauth) return unauth;
    try {
      const { data } = await readJsonFile<T[]>(env, cfg.path);
      const list = Array.isArray(data) ? data : [];
      if (cfg.sort) list.sort(cfg.sort);
      return json({ data: list });
    } catch (e) {
      return fail(502, `GitHub read failed: ${errMsg(e)}`);
    }
  };

  const onPost: PagesFunction<Env> = async ({ request, env }) => {
    const unauth = await requireAuth(request, env);
    if (unauth) return unauth;

    let body: Partial<T>;
    try {
      body = (await request.json()) as Partial<T>;
    } catch {
      return fail(400, "Invalid JSON body");
    }

    const validated = cfg.validate
      ? cfg.validate(body, "create")
      : (body as T);
    if (typeof validated === "string") return fail(400, validated);

    if (!validated.slug || !isValidSlug(validated.slug)) {
      return fail(400, "Invalid slug");
    }

    try {
      const { data, sha } = await readJsonFile<T[]>(env, cfg.path);
      const list = Array.isArray(data) ? [...data] : [];
      if (list.some((it) => it.slug === validated.slug)) {
        return fail(409, `A ${cfg.kind} with that slug already exists`);
      }
      list.push(validated);
      if (cfg.sort) list.sort(cfg.sort);
      await writeJsonFile(
        env,
        cfg.path,
        list,
        `admin: add ${cfg.kind} ${validated.slug}`,
        sha,
      );
      return json({ data: validated }, { status: 201 });
    } catch (e) {
      return fail(502, `GitHub write failed: ${errMsg(e)}`);
    }
  };

  return { onGet, onPost };
}

export function makeItemHandlers<T extends HasSlug>(cfg: CrudConfig<T>) {
  const onGet: PagesFunction<Env, "slug"> = async ({ request, env, params }) => {
    const unauth = await requireAuth(request, env);
    if (unauth) return unauth;
    const slug = String(params.slug || "");
    if (!slug) return fail(400, "Missing slug");
    try {
      const { data } = await readJsonFile<T[]>(env, cfg.path);
      const item = (Array.isArray(data) ? data : []).find(
        (it) => it.slug === slug,
      );
      if (!item) return fail(404, `${cfg.kind} not found`);
      return json({ data: item });
    } catch (e) {
      return fail(502, `GitHub read failed: ${errMsg(e)}`);
    }
  };

  const onPut: PagesFunction<Env, "slug"> = async ({ request, env, params }) => {
    const unauth = await requireAuth(request, env);
    if (unauth) return unauth;
    const slug = String(params.slug || "");
    if (!slug) return fail(400, "Missing slug");

    let body: Partial<T>;
    try {
      body = (await request.json()) as Partial<T>;
    } catch {
      return fail(400, "Invalid JSON body");
    }

    const incoming: Partial<T> = { ...body, slug: slug as T["slug"] };
    const validated = cfg.validate
      ? cfg.validate(incoming, "update")
      : (incoming as T);
    if (typeof validated === "string") return fail(400, validated);

    try {
      const { data, sha } = await readJsonFile<T[]>(env, cfg.path);
      const list = Array.isArray(data) ? [...data] : [];
      const idx = list.findIndex((it) => it.slug === slug);
      if (idx === -1) return fail(404, `${cfg.kind} not found`);
      list[idx] = validated;
      if (cfg.sort) list.sort(cfg.sort);
      await writeJsonFile(
        env,
        cfg.path,
        list,
        `admin: update ${cfg.kind} ${slug}`,
        sha,
      );
      return json({ data: validated });
    } catch (e) {
      return fail(502, `GitHub write failed: ${errMsg(e)}`);
    }
  };

  const onDelete: PagesFunction<Env, "slug"> = async ({
    request,
    env,
    params,
  }) => {
    const unauth = await requireAuth(request, env);
    if (unauth) return unauth;
    const slug = String(params.slug || "");
    if (!slug) return fail(400, "Missing slug");
    try {
      const { data, sha } = await readJsonFile<T[]>(env, cfg.path);
      const list = Array.isArray(data) ? [...data] : [];
      const idx = list.findIndex((it) => it.slug === slug);
      if (idx === -1) return fail(404, `${cfg.kind} not found`);
      list.splice(idx, 1);
      await writeJsonFile(
        env,
        cfg.path,
        list,
        `admin: delete ${cfg.kind} ${slug}`,
        sha,
      );
      return json({ ok: true });
    } catch (e) {
      return fail(502, `GitHub write failed: ${errMsg(e)}`);
    }
  };

  return { onGet, onPut, onDelete };
}

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
