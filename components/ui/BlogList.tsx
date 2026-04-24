"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/data";

const TAG_BG: Record<string, string> = {
  AI: "oklch(0.92 0.06 268/.8)",
  Tech: "oklch(0.92 0.06 145/.8)",
  Business: "oklch(0.92 0.06 40/.8)",
  Social: "oklch(0.92 0.06 198/.8)",
  Opinion: "oklch(0.92 0.06 320/.8)",
  Politics: "oklch(0.92 0.06 25/.8)",
  Technology: "oklch(0.92 0.06 145/.8)",
  "Social Media": "oklch(0.92 0.06 198/.8)",
};
const TAG_FG: Record<string, string> = {
  AI: "oklch(0.40 0.18 268)",
  Tech: "oklch(0.38 0.16 145)",
  Business: "oklch(0.38 0.16 40)",
  Social: "oklch(0.35 0.16 198)",
  Opinion: "oklch(0.42 0.16 320)",
  Politics: "oklch(0.42 0.16 25)",
  Technology: "oklch(0.38 0.16 145)",
  "Social Media": "oklch(0.35 0.16 198)",
};

function tagStyle(tag: string) {
  const bg = TAG_BG[tag];
  const fg = TAG_FG[tag];
  if (!bg) return undefined;
  return {
    background: bg,
    color: fg,
    border: `1px solid ${bg.replace(".8", ".3")}`,
  };
}

interface Props {
  posts: BlogPost[];
}

export default function BlogList({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 200);
    return () => window.clearTimeout(t);
  }, [query]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const visible = useMemo(() => {
    let data = [...posts];
    if (activeTag !== "all") {
      data = data.filter((p) => p.tags.includes(activeTag));
    }
    const q = debounced.trim().toLowerCase();
    if (q) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return data;
  }, [posts, activeTag, debounced]);

  return (
    <>
      <div id="filter-bar">
        <div className="filter-inner">
          <div className="filter-label">Tag</div>
          <div className="f-chips">
            <button
              type="button"
              className={`fchip${activeTag === "all" ? " on" : ""}`}
              onClick={() => setActiveTag("all")}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={`fchip${activeTag === t ? " on" : ""}`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search articles…"
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
            Showing {visible.length} article{visible.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="blog-grid">
          {visible.map((post, i) => (
            <Link
              key={post.slug}
              className="gg blog-card rv in"
              href={`/blog/${post.slug}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="blog-img-wrap">
                {post.thumbnail ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    className="blog-img"
                    src={post.thumbnail}
                    alt={post.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="blog-img" />
                )}
              </div>
              <div className="blog-body">
                <div className="blog-tags">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t} className="btag" style={tagStyle(t)}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="blog-date">{formatDate(post.date)}</div>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.description}</div>
                <div className="blog-read">Read Article →</div>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <div id="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">No articles found</div>
            <div className="empty-sub">
              Try a different tag or search term.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
