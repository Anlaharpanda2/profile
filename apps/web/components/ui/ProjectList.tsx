"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";

const TAG_COLORS: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  Government: {
    bg: "oklch(0.94 0.06 268/.85)",
    color: "oklch(0.40 0.18 268)",
    border: "oklch(0.82 0.10 268/.3)",
  },
  "Full Stack": {
    bg: "oklch(0.94 0.06 268/.7)",
    color: "oklch(0.42 0.18 268)",
    border: "oklch(0.82 0.10 268/.25)",
  },
  DevOps: {
    bg: "oklch(0.94 0.06 220/.85)",
    color: "oklch(0.38 0.16 220)",
    border: "oklch(0.80 0.10 220/.3)",
  },
  Backend: {
    bg: "oklch(0.94 0.06 240/.8)",
    color: "oklch(0.38 0.16 240)",
    border: "oklch(0.80 0.10 240/.3)",
  },
  Education: {
    bg: "oklch(0.94 0.06 200/.8)",
    color: "oklch(0.38 0.16 200)",
    border: "oklch(0.80 0.10 200/.3)",
  },
  Design: {
    bg: "oklch(0.94 0.06 320/.85)",
    color: "oklch(0.42 0.16 320)",
    border: "oklch(0.80 0.10 320/.3)",
  },
  "AI / ML": {
    bg: "oklch(0.94 0.06 145/.85)",
    color: "oklch(0.38 0.16 145)",
    border: "oklch(0.80 0.10 145/.3)",
  },
};

function tagStyle(tag: string) {
  const c = TAG_COLORS[tag] || {
    bg: "oklch(0.92 0.05 268/.6)",
    color: "oklch(0.40 0.15 268)",
    border: "oklch(0.80 0.08 268/.3)",
  };
  return {
    background: c.bg,
    color: c.color,
    border: `1px solid ${c.border}`,
  };
}

const FILTERS: Array<{ key: string; label: string }> = [
  { key: "all", label: "All Projects" },
  { key: "fullstack", label: "Full Stack" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "ai", label: "AI / ML" },
  { key: "design", label: "UI/UX" },
];

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "alpha">("newest");

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(t);
  }, [query]);

  const visible = useMemo(() => {
    let data = [...projects];
    if (filter !== "all") {
      data = data.filter((p) => p.categories.includes(filter));
    }
    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.problem.toLowerCase().includes(q) ||
          p.stack.some((t) => t.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (sort === "alpha") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      data.sort((a, b) => b.year - a.year);
    }
    return data;
  }, [projects, filter, debouncedQuery, sort]);

  const total = projects.length;

  return (
    <>
      <div id="filter-bar">
        <div className="filter-inner">
          <div className="filter-label">Filter</div>
          <div className="f-chips">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`fchip${filter === f.key ? " on" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search projects…"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="count-row rv">
          <div className="proj-count">
            Showing {visible.length} project{visible.length === 1 ? "" : "s"}
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "alpha")}
          >
            <option value="newest">Newest First</option>
            <option value="alpha">A–Z</option>
          </select>
        </div>

        <div id="proj-list">
          {visible.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`pcard in${p.featured ? " featured" : ""}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="pcard-body">
                <div className="pcard-head">
                  <div className="pcard-num">
                    {p.num} / {String(total).padStart(2, "0")}
                  </div>
                  <div className="pcard-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="ptag" style={tagStyle(t)}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="pcard-name">{p.title}</h2>
                  <div className="pcard-role">{p.role}</div>
                  <p className="pcard-desc">{p.problem}</p>
                </div>
                <div className="pcard-foot">
                  <div className="pcard-tech">
                    {p.stack.slice(0, 5).map((t) => (
                      <span key={t} className="tc">
                        {t}
                      </span>
                    ))}
                    {p.stack.length > 5 && (
                      <span className="tc">+{p.stack.length - 5}</span>
                    )}
                  </div>
                  <span className="pcard-link">Case Study →</span>
                </div>
              </div>
              <div className="pcard-visual">
                <div
                  className="pcard-visual-bg"
                  style={{ background: p.visual.bg }}
                />
                <div className="pcard-visual-overlay" />
                <div className="pcard-visual-label">{p.visual.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <div id="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">No projects found</div>
            <div className="empty-sub">
              Try a different filter or search term.
            </div>
          </div>
        )}

        <div className="cta-band rv">
          <div className="cta-mesh" />
          <div className="cta-grid" />
          <h2 className="cta-title">Have a project in mind?</h2>
          <p className="cta-sub">
            I&apos;m open to full-time roles, freelance work & collaborations.
          </p>
          <div className="cta-btns">
            <a className="cta-btn primary" href="mailto:anlaharpanda@gmail.com">
              ✉️ Let&apos;s Talk
            </a>
            <a
              className="cta-btn"
              href="/CVPersonal.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
            <a
              className="cta-btn"
              href="https://www.linkedin.com/in/anlaharpanda"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
