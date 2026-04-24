"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SECTIONS = ["hero", "projects", "blog", "about", "contact"] as const;

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      let cur: string = "hero";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = id === "hero" ? 0 : 72;
    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
  };

  return (
    <nav id="nav" className={scrolled ? "scrolled" : "hero-zone"}>
      <a
        className="nav-logo"
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          goTo("hero");
        }}
      >
        Anla.
      </a>
      <div className="nav-links">
        {SECTIONS.map((id) => (
          <button
            key={id}
            type="button"
            className={`nav-link${active === id ? " active" : ""}`}
            onClick={() => goTo(id)}
          >
            {id === "hero"
              ? "Home"
              : id === "projects"
                ? "Work"
                : id === "blog"
                  ? "Blog"
                  : id === "about"
                    ? "About"
                    : "Contact"}
          </button>
        ))}
        <Link className="nav-cta" href="/blog">
          Blog ↗
        </Link>
      </div>
    </nav>
  );
}
