"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

interface MeResponse {
  user: { username: string };
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api<MeResponse>("/api/auth/me")
      .then((r) => {
        setUser(r.user);
        setChecking(false);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  const onLogout = async () => {
    try {
      await api<{ ok: true }>("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.replace("/login");
  };

  if (checking || !user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          fontSize: 14,
        }}
      >
        Checking session…
      </div>
    );
  }

  const link = (href: string, label: string) => {
    const active =
      pathname === href || (href !== "/admin" && pathname?.startsWith(href));
    return (
      <Link
        href={href}
        className={`admin-link${active ? " active" : ""}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-nav">
          <Link
            href="/admin"
            className="nav-logo"
            style={{ color: "var(--text)", marginRight: 12 }}
          >
            Anla.
          </Link>
          {link("/admin", "Dashboard")}
          {link("/admin/projects", "Projects")}
          {link("/admin/blog", "Blog")}
        </div>
        <div className="admin-header-nav">
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {user.username}
          </span>
          <Link href="/" className="admin-link">
            View site ↗
          </Link>
          <button
            type="button"
            className="admin-btn secondary"
            onClick={onLogout}
            style={{ padding: "6px 14px" }}
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
