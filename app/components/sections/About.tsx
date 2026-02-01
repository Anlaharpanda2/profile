"use client";
import { FaChess } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";

export default function About() {
  const skills = {
    "Frontend Development": [
      { name: "React", emoji: "⚛️" },
      { name: "Vue.js", emoji: "💚" },
      { name: "Next.js", emoji: "🚀" },
      { name: "TailwindCSS", emoji: "🎨" },
      { name: "UI/UX Design", emoji: "🎯" },
    ],
    "Backend Development": [
      { name: "Express.js", emoji: "🟢" },
      { name: "Laravel", emoji: "🔴" },
      { name: "Node.js", emoji: "📦" },
      { name: "RESTful APIs", emoji: "🔗" },
      { name: "MySQL/PostgreSQL", emoji: "🗄️" },
    ],
    "Cloud & DevOps": [
      { name: "AWS", emoji: "☁️" },
      { name: "Docker", emoji: "🐳" },
      { name: "CI/CD", emoji: "🔄" },
      { name: "Cloud Deployment", emoji: "🌐" },
      { name: "Version Control", emoji: "📂" },
    ],
  };

  return (
    <section id="about" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Title + Easter Egg - Purposeful interaction */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          About Me
          <motion.span
            title="I love chess, strategy fuels my coding."
            whileHover={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="inline-block cursor-help text-purple-600"
          >
            <FaChess />
          </motion.span>
        </motion.h2>

        <div className="text-center max-w-3xl mx-auto">
          {/* Avatar - Subtle interaction feedback */}
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg ring-offset-2 focus:ring-2 focus:ring-blue-400"
            whileHover={{
              scale: 1.03,
              borderColor: "#4F46E5"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/pfp.webp"
              alt="Anla Harpanda - Full Stack Web Developer and UI/UX Designer"
              width={128}
              height={128}
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="128px"
            />
          </motion.div>

          {/* Mission Statement */}
          <motion.p
            className="text-lg italic text-gray-600 dark:text-gray-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            &quot;I build web applications that turn ideas into products people actually use, blending full-stack engineering with UI/UX design.&quot;
          </motion.p>

          {/* About Text with contextual depth */}
          <motion.div
            className="space-y-4 text-lg text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p>
              I&apos;m a Full Stack Web Developer & UI/UX Designer who gets excited about building scalable web applications,
              cloud-optimized solutions, and user-centered designs. My expertise spans Express.js, Next.js, Laravel, Vue.js, and React.
            </p>
            <p>
              Most recently, I led a team of four as Project Manager for PEPSIKUBURGER, a government platform under DP3AP2KB
              West Sumatra Province serving over <span className="font-medium">5,000 women in economic empowerment programs</span>.
              This experience taught me that great technology is about understanding user needs and delivering impact at scale.
            </p>
            <p>
              As founder of anla.id, I&apos;ve completed <span className="font-medium">300+ illustration projects</span>, which sharpened my design eye.
              Currently pursuing Information Technology at Politeknik Negeri Padang while continuously expanding my full-stack capabilities.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.hr
            className="border-t border-gray-300 dark:border-gray-700 my-8 w-2/3 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Skills Grouped - Refined Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(skills).map(([group, items], groupIndex) => (
              <motion.div
                key={group}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + groupIndex * 0.1,
                }}
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  {group}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {items.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default"
                    >
                      <span className="text-xl" aria-hidden="true">{skill.emoji}</span>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {[
              {
                href: "https://github.com/itsanla",
                label: "GitHub",
                icon: <Github className="w-6 h-6" />,
                hover: "hover:text-gray-900 dark:hover:text-white",
              },
              {
                href: "https://www.linkedin.com/in/anlaharpanda",
                label: "LinkedIn",
                icon: <Linkedin className="w-6 h-6" />,
                hover: "hover:text-blue-600",
              },
              {
                href: "mailto:anlaharpanda@gmail.com",
                label: "Email",
                icon: <Mail className="w-6 h-6" />,
                hover: "hover:text-red-500",
              },
            ].map(({ href, label, icon, hover }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2 }}
                className={`text-gray-700 dark:text-gray-300 transition-colors ${hover}`}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA + Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="space-y-4"
          >
            <Link
              href="mailto:anlaharpanda@gmail.com"
              className="block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              I&apos;m currently open to new opportunities. Let&apos;s connect!
            </Link>
            <Link
              href="/projects"
              className="block text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Or view my case studies →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}