import {
  createSessionCookie,
  credentialsMatch,
} from "../_lib/auth";
import type { Env } from "../_lib/env";
import { requireEnv } from "../_lib/env";
import { fail, json } from "../_lib/response";

interface LoginBody {
  username?: string;
  password?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    requireEnv(env);
  } catch (e) {
    return fail(500, e instanceof Error ? e.message : "Server misconfigured");
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return fail(400, "Invalid JSON body");
  }

  const username = (body.username || "").trim();
  const password = body.password || "";
  if (!username || !password) {
    return fail(400, "Username and password required");
  }

  if (!credentialsMatch(env, username, password)) {
    return fail(401, "Invalid credentials");
  }

  const cookie = await createSessionCookie(env, username);
  return json(
    { ok: true, user: { username } },
    { headers: { "Set-Cookie": cookie } },
  );
};
