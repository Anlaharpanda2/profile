const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

export function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init.headers || {}) },
  });
}

export function fail(
  status: number,
  error: string,
  extra?: Record<string, unknown>,
): Response {
  return json({ error, ...(extra || {}) }, { status });
}
