"use client";
import { useEffect } from "react";

const SELECTORS = [".rv", ".rl", ".rr", ".rs", ".sg-cards", ".pcard"];

export default function RevealEffects() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(SELECTORS.join(","));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
