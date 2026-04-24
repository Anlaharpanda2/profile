"use client";
import Link from "next/link";

type DockItem = {
  key: string;
  icon: string;
  href?: string;
  scrollTo?: string;
};

interface MobileDockProps {
  items?: DockItem[];
  active?: string;
}

const HOME_ITEMS: DockItem[] = [
  { key: "hero", icon: "🏠", scrollTo: "hero" },
  { key: "projects", icon: "💼", scrollTo: "projects" },
  { key: "blog", icon: "📝", scrollTo: "blog" },
  { key: "about", icon: "👤", scrollTo: "about" },
  { key: "contact", icon: "✉️", scrollTo: "contact" },
];

export const PAGE_ITEMS: DockItem[] = [
  { key: "home", icon: "🏠", href: "/" },
  { key: "work", icon: "💼", href: "/projects" },
  { key: "blog", icon: "📝", href: "/blog" },
  { key: "contact", icon: "✉️", href: "/#contact" },
];

export default function MobileDock({
  items = HOME_ITEMS,
  active,
}: MobileDockProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - (id === "hero" ? 0 : 72),
      behavior: "smooth",
    });
  };

  return (
    <nav className="dock">
      {items.map((it) => {
        const isActive = active === it.key;
        const className = `di${isActive ? " active" : ""}`;
        const inner = (
          <>
            <div className="di-icon">{it.icon}</div>
            <div className="di-dot" />
          </>
        );
        if (it.href) {
          return (
            <Link key={it.key} className={className} href={it.href}>
              {inner}
            </Link>
          );
        }
        return (
          <button
            key={it.key}
            type="button"
            className={className}
            onClick={() => it.scrollTo && handleScroll(it.scrollTo)}
          >
            {inner}
          </button>
        );
      })}
    </nav>
  );
}
