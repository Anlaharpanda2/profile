import { clearSessionCookie } from "../_lib/auth";
import { json } from "../_lib/response";

export const onRequestPost: PagesFunction = async () => {
  return json(
    { ok: true },
    { headers: { "Set-Cookie": clearSessionCookie() } },
  );
};
