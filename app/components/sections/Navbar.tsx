"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Case Studies" },
];



// Smooth scroll function for internal links
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle Theme"
      whileTap={{ rotate: 180, scale: 0.8 }}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </motion.button>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => setMounted(true), []);


  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 dark:text-gray-100"
          >
            Anla Harpanda<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => {
              const isInternalLink = link.href.startsWith('#');
              const sectionId = link.href.replace('#', '');

              return isInternalLink ? (
                <button
                  key={link.href}
                  onClick={() => smoothScrollTo(sectionId)}
                  aria-current={
                    activeSection === sectionId ? "page" : undefined
                  }
                  className={`relative group transition-colors ${activeSection === sectionId
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                    } hover:text-blue-600 dark:hover:text-blue-400`}
                >
                  {link.label}
                  {/* Enhanced underline animation with better visual feedback */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-600 to-indigo-600 transform origin-left transition-transform duration-300 ${activeSection === sectionId
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-600 to-indigo-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}

            {/* Quick action buttons for immediate access */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <a
                href="mailto:anlaharpanda@gmail.com"
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Send email"
              >
                ✉️ Email
              </a>

              <Link
                href="/resume"
                className="flex items-center gap-1 px-4 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all transform hover:scale-105"
                aria-label="View resume"
              >
                📄 Resume
              </Link>
            </div>

            {mounted && <ThemeToggle theme={theme ?? "light"} setTheme={setTheme} />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {mounted && <ThemeToggle theme={theme ?? "light"} setTheme={setTheme} />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 dark:text-white" /> : <Menu className="dark:text-white w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 px-4 py-6 space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Navigation Links */}
              {links.map((link) => {
                const isInternalLink = link.href.startsWith('#');
                const sectionId = link.href.replace('#', '');

                return isInternalLink ? (
                  <button
                    key={link.href}
                    onClick={() => {
                      smoothScrollTo(sectionId);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${activeSection === sectionId
                      ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3">
                  Quick Actions
                </p>

                <a
                  href="mailto:anlaharpanda@gmail.com"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  ✉️ Send Email
                </a>

                <Link
                  href="/resume"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-md border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all"
                >
                  📄 View Resume
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
