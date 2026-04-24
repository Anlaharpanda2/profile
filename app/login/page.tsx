"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api<{ ok: true }>("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse at top, oklch(0.95 0.04 268), #fff 60%)",
      }}
    >
      <div
        className="gw"
        style={{ width: "100%", maxWidth: 420, padding: 36 }}
      >
        <Link
          href="/"
          className="nav-logo"
          style={{ color: "var(--text)", fontSize: 24, marginBottom: 8 }}
        >
          Anla.
        </Link>
        <h1
          className="font-serif-display"
          style={{
            fontSize: 30,
            letterSpacing: -1,
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          Sign in
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
          Admin access only.
        </p>

        {error && (
          <div className="admin-flash error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="admin-row">
            <label className="admin-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="admin-input"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="admin-row">
            <label className="admin-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="admin-input"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="admin-btn"
            style={{ width: "100%", justifyContent: "center", padding: 12 }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
