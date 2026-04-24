import type { Env } from "./env";

interface GitHubFile {
  sha: string;
  content: string;
  encoding: string;
}

const GH_API = "https://api.github.com";

function ghHeaders(env: Env): HeadersInit {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": env.GITHUB_USERNAME || "anla-portfolio-admin",
  };
}

function branchParam(env: Env): string {
  return env.GITHUB_BRANCH ? `?ref=${encodeURIComponent(env.GITHUB_BRANCH)}` : "";
}

function decodeBase64Utf8(b64: string): string {
  const clean = b64.replace(/\n/g, "");
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export async function readJsonFile<T>(
  env: Env,
  path: string,
): Promise<{ data: T; sha: string | null }> {
  const url = `${GH_API}/repos/${env.GITHUB_REPO}/contents/${encodeURIComponent(path)}${branchParam(env)}`;
  const res = await fetch(url, { headers: ghHeaders(env) });
  if (res.status === 404) {
    return { data: [] as unknown as T, sha: null };
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET ${path} failed (${res.status}): ${body}`);
  }
  const file = (await res.json()) as GitHubFile;
  const raw = decodeBase64Utf8(file.content);
  try {
    return { data: JSON.parse(raw) as T, sha: file.sha };
  } catch (e) {
    throw new Error(
      `Invalid JSON in ${path}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}

export async function writeJsonFile<T>(
  env: Env,
  path: string,
  data: T,
  message: string,
  sha: string | null,
): Promise<{ sha: string }> {
  const url = `${GH_API}/repos/${env.GITHUB_REPO}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = {
    message,
    content: encodeBase64Utf8(JSON.stringify(data, null, 2) + "\n"),
    committer: {
      name: env.GITHUB_USERNAME || "anla-portfolio",
      email: `${env.GITHUB_USERNAME || "anla-portfolio"}@users.noreply.github.com`,
    },
  };
  if (env.GITHUB_BRANCH) body.branch = env.GITHUB_BRANCH;
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: { ...ghHeaders(env), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub PUT ${path} failed (${res.status}): ${errBody}`);
  }
  const result = (await res.json()) as { content: { sha: string } };
  return { sha: result.content.sha };
}
