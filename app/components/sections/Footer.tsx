"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      href: "https://github.com/itsanla",
      label: "GitHub",
      icon: <Github className="w-5 h-5" />,
      hoverColor: "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      href: "https://www.linkedin.com/in/anlaharpanda",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      href: "mailto:anlaharpanda@gmail.com",
      label: "Email",
      icon: <Mail className="w-5 h-5" />,
      hoverColor: "hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
    },
  ];

  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Contact Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Let&apos;s Connect
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to collaborate? Reach out through any of these channels.
          </p>

          {/* Enhanced Social Links */}
          <motion.div
            className="flex justify-center gap-4 mb-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {socials.map(({ href, label, icon, hoverColor }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ y: -2, scale: 1.1 }}
                className={`p-3 rounded-lg text-gray-600 dark:text-gray-400 transition-all duration-300 ${hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Direct Email Link */}
          <motion.a
            href="mailto:anlaharpanda@gmail.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Mail className="w-4 h-4" />
            anlaharpanda@gmail.com
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Motto + Copyright */}
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-sm italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            © {new Date().getFullYear()} Anla Harpanda. Always learning,
            always building.
          </motion.p>

          {/* Navigation */}
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Signal */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-600">
          Built with Next.js, Tailwind, and ❤️. Deployed on Cloudflare Pages
        </p>
      </div>
    </footer>
  );
}
