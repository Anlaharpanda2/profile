"use client";
import { useEffect } from "react";

interface PageEffectsProps {
  enableMagnetic?: boolean;
  tiltSelectors?: { selector: string; depth?: number }[];
  enableCounter?: boolean;
  enableRipple?: boolean;
}

export default function PageEffects({
  enableMagnetic = true,
  tiltSelectors = [],
  enableCounter = false,
  enableRipple = false,
}: PageEffectsProps) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // hero entrance
    const t = window.setTimeout(
      () => document.body.classList.add("loaded"),
      80,
    );
    cleanups.push(() => {
      window.clearTimeout(t);
      document.body.classList.remove("loaded");
    });

    // magnetic
    if (enableMagnetic) {
      const btns = document.querySelectorAll<HTMLElement>(".magnetic");
      btns.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.38;
          const dy = (e.clientY - r.top - r.height / 2) * 0.38;
          btn.style.transform = `translate(${dx}px,${dy}px) scale(1.03)`;
          btn.style.transition = "transform .08s";
        };
        const onLeave = () => {
          btn.style.transform = "";
          btn.style.transition =
            "transform .55s cubic-bezier(0.34,1.56,0.64,1)";
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // tilt
    for (const { selector, depth = 8 } of tiltSelectors) {
      const els = document.querySelectorAll<HTMLElement>(selector);
      els.forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateY(${x * depth}deg) rotateX(${-y * depth}deg) scale(1.02)`;
          el.style.transition = "transform .08s";
        };
        const onLeave = () => {
          el.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) scale(1)";
          el.style.transition =
            "transform .65s cubic-bezier(0.22,1,0.36,1)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ripple on cards
    if (enableRipple) {
      const els = document.querySelectorAll<HTMLElement>(
        ".proj-card,.blog-card,.pcard",
      );
      els.forEach((el) => {
        const onClick = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const sz = Math.max(r.width, r.height) * 2;
          const rip = document.createElement("span");
          rip.className = "ripple";
          rip.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - r.left - sz / 2}px;top:${e.clientY - r.top - sz / 2}px;`;
          el.style.position = el.style.position || "relative";
          el.appendChild(rip);
          rip.addEventListener("animationend", () => rip.remove());
        };
        el.addEventListener("click", onClick);
        cleanups.push(() => el.removeEventListener("click", onClick));
      });
    }

    // counter
    if (enableCounter) {
      const els = document.querySelectorAll<HTMLElement>("[data-count]");
      const cio = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const el = en.target as HTMLElement;
            const target = parseInt(el.dataset.count || "0", 10);
            const suffix = el.dataset.suffix || "+";
            const dur = 1200;
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const e2 = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(e2 * target) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            cio.unobserve(el);
          }
        },
        { threshold: 0.6 },
      );
      els.forEach((el) => cio.observe(el));
      cleanups.push(() => cio.disconnect());
    }

    return () => cleanups.forEach((c) => c());
  }, [enableMagnetic, tiltSelectors, enableCounter, enableRipple]);

  return null;
}
