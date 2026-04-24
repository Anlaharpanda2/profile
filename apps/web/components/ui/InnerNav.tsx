"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InnerNavProps {
  active?: "work" | "blog";
  showBack?: boolean;
  variant?: "dark-hero" | "light";
}

export default function InnerNav({
  active,
  showBack = true,
  variant = "dark-hero",
}: InnerNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant === "light") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const cls =
    variant === "light"
      ? "light-zone"
      : scrolled
        ? "scrolled"
        : "hero-zone";

  return (
    <nav id="nav" className={cls}>
      <Link className="nav-logo" href="/">
        Anla.
      </Link>
      <div className="nav-links">
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link
          className={`nav-link${active === "work" ? " active" : ""}`}
          href="/projects"
        >
          Work
        </Link>
        <Link
          className={`nav-link${active === "blog" ? " active" : ""}`}
          href="/blog"
        >
          Blog
        </Link>
        {showBack && (
          <Link className="nav-back" href="/">
            ← Back to Home
          </Link>
        )}
      </div>
    </nav>
  );
}
