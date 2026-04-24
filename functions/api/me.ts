import { getSession } from "../_lib/auth";
import type { Env } from "../_lib/env";
import { fail, json } from "../_lib/response";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const session = await getSession(request, env);
  if (!session) return fail(401, "Unauthorized");
  return json({ user: { username: session.u, exp: session.exp } });
};
