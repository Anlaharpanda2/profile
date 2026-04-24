"use client";

export type ApiError = { error: string };

function base(): string {
  return (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${base()}${path}`;
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  let data: unknown;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && "error" in data
        ? String((data as ApiError).error)
        : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

export function apiUrl(path: string): string {
  return `${base()}${path}`;
}
