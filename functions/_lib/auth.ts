import type { Env } from "./env";

const COOKIE_NAME = "anla_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  u: string;
  exp: number;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64urlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const arr =
    bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes as ArrayBuffer);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(secret: string, data: string): Promise<string> {
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64urlEncode(sig);
}

async function verify(
  secret: string,
  data: string,
  signature: string,
): Promise<boolean> {
  const key = await hmacKey(secret);
  const bytes = b64urlDecode(signature);
  return crypto.subtle.verify("HMAC", key, bytes, enc.encode(data));
}

export async function createSessionCookie(
  env: Env,
  username: string,
): Promise<string> {
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
  };
  const data = b64urlEncode(enc.encode(JSON.stringify(payload)));
  const sig = await sign(env.GITHUB_TOKEN, data);
  const value = `${data}.${sig}`;
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SEC}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (!k) continue;
    out[k] = rest.join("=");
  }
  return out;
}

export async function getSession(
  request: Request,
  env: Env,
): Promise<SessionPayload | null> {
  const cookies = parseCookies(request.headers.get("Cookie"));
  const raw = cookies[COOKIE_NAME];
  if (!raw) return null;
  const dot = raw.indexOf(".");
  if (dot < 0) return null;
  const data = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  let ok = false;
  try {
    ok = await verify(env.GITHUB_TOKEN, data, sig);
  } catch {
    return null;
  }
  if (!ok) return null;
  let payload: SessionPayload;
  try {
    payload = JSON.parse(dec.decode(b64urlDecode(data))) as SessionPayload;
  } catch {
    return null;
  }
  if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) {
    return null;
  }
  return payload;
}

export async function requireSession(
  request: Request,
  env: Env,
): Promise<SessionPayload | Response> {
  const session = await getSession(request, env);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function credentialsMatch(
  env: Env,
  username: string,
  password: string,
): boolean {
  return (
    timingSafeEqual(username, env.LOGIN_USERNAME) &&
    timingSafeEqual(password, env.LOGIN_PASSWORD)
  );
}
