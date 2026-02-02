"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import projects from "../../data/projects";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = dynamic(() => import("./ProjectCard"), { ssr: false });

// Debounce hook
function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function ProjectsIndex() {
  const allProjects = Object.values(projects);

  // Unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach((project) => {
      project.stack.forEach((tech: string) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allProjects]);

  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTechs, setShowAllTechs] = useState(false);
  const debouncedSearch = useDebounce(searchQuery);

  // Count how many projects use each tech
  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProjects.forEach((p) => {
      p.stack.forEach((t: string) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [allProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesTech =
        selectedTech === "All" || project.stack.includes(selectedTech);
      const q = debouncedSearch.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.stack.some((tech: string) => tech.toLowerCase().includes(q));
      return matchesTech && matchesSearch;
    });
  }, [allProjects, selectedTech, debouncedSearch]);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            My Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Here are my projects across full-stack, backend, and AI development. Each one represents a problem I was passionate about solving, crafted with care, clean code, and a focus on creating tools that people actually use.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Search My Projects
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or technology..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Filter by Technology
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech("All")}
                aria-pressed={selectedTech === "All"}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform ${selectedTech === "All"
                  ? "bg-blue-600 text-white scale-105 shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                All
              </button>
              {allTechnologies.slice(0, showAllTechs ? allTechnologies.length : 5).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  aria-pressed={selectedTech === tech}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform ${selectedTech === tech
                    ? "bg-blue-600 text-white scale-105 shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {tech}
                </button>
              ))}
              {allTechnologies.length > 5 && (
                <button
                  onClick={() => setShowAllTechs(!showAllTechs)}
                  className="px-4 py-2 rounded-full text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {showAllTechs ? "Show Less" : "Show All"}
                </button>
              )}
            </div>
          </div>

          {/* Reset Filters */}
          {(selectedTech !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTech("All");
                setSearchQuery("");
              }}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Reset filters
            </button>
          )}
        </motion.div>

        {/* Top Skills Summary */}
        <motion.div
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {Object.entries(techCounts).map(([tech, count]) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              {tech}: {count}
            </span>
          ))}
        </motion.div>

        {/* Projects Count + Selected Filters */}
        <motion.div
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p
            className="text-gray-600 dark:text-gray-400"
            role="status"
            aria-live="polite"
          >
            Showing {filteredProjects.length} of {allProjects.length} projects
          </p>
          {selectedTech !== "All" && (
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
              Filtered by: {selectedTech} ✕
            </span>
          )}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resume CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/resume"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View My Resume →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
