"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github, Crown } from "lucide-react";

// Skill badges component for immediate display
const SkillBadge = ({ skill, icon }: { skill: string; icon?: string }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700">
    {icon && <span className="text-xs">{icon}</span>}
    {skill}
  </span>
);

export default function Hero() {
  const coreSkills = [
    { name: "Next.js", icon: "⚛️" },
    { name: "Express.js", icon: "🚀" },
    { name: "Laravel", icon: "🔴" },
    { name: "Vue.js", icon: "💚" }
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-0 relative overflow-hidden bg-grid-slate-100 dark:bg-grid-slate-800">
      {/* Subtle animated background - only if motion is not reduced */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          initial={false}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.08, 1] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          initial={false}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 10, 0], scale: [1, 1.06, 1] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          initial={false}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Profile Photo */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-90 lg:h-120">
            <Image
              src="/profile.webp"
              alt="Anla Harpanda - Full Stack Web Developer"
              fill
              className="object-contain rounded-2xl"
              priority
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="text-center lg:text-left">
          {/* Name - loads immediately without animation delay */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-2">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Anla Harpanda
            </span>
            {/* Easter egg on hover */}
            <motion.span
              className="cursor-default"
              whileHover={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Crown className="w-5 h-5 text-purple-600" />
            </motion.span>
          </h1>

          {/* Title - loads immediately */}
          <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-800 dark:text-gray-200">
            Full Stack Web Developer & UI/UX Designer
          </h2>

          {/* Core Skills Badges - loads immediately */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
            {coreSkills.map((skill) => (
              <SkillBadge key={skill.name} skill={skill.name} icon={skill.icon} />
            ))}
          </div>

          {/* Professional Tagline - loads immediately */}
          <p className="text-lg md:text-xl mb-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            I build scalable web applications and user-centered designs that solve real-world problems.
          </p>

          {/* Description - loads immediately */}
          <p className="text-md md:text-lg mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I specialize in Express.js, Next.js, Laravel, Vue.js, and React to create seamless experiences from server to client. AWS certified developer with expertise in cloud-optimized applications.
          </p>

          {/* Social icons row - loads immediately */}
          <div className="flex justify-center lg:justify-start gap-6 mb-12">
            <Link
              href="https://github.com/itsanla"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="w-7 h-7 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/anlaharpanda"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-7 h-7 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors" />
            </Link>
            <Link href="mailto:anlaharpanda@gmail.com" aria-label="Email">
              <Mail className="w-7 h-7 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors" />
            </Link>
          </div>

          {/* Enhanced CTA buttons with better user flow */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {/* Primary CTA - Most important action */}
            <Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="View My Projects"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg transition-all 
            duration-500 bg-[length:200%_200%] hover:bg-[position:100%_0] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            dark:focus:ring-offset-gray-900 transform hover:-translate-y-1"
            >
              🚀 View My Work
            </Link>

            {/* Secondary CTA - Direct contact */}
            <Link
              href="mailto:anlaharpanda@gmail.com"
              aria-label="Contact Me"
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 
            dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            dark:focus:ring-offset-gray-900 transform hover:-translate-y-1"
            >
              💬 Let&apos;s Talk
            </Link>
          </div>

          {/* Secondary actions - Less prominent but accessible */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 text-sm">
            <Link
              href="/resume"
              aria-label="View Resume Online"
              className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-300 dark:border-gray-600 rounded-md hover:border-blue-600 dark:hover:border-blue-400"
            >
              📄 Resume
            </Link>

            <a
              href="/CVPersonal.pdf"
              download
              aria-label="Download CV PDF"
              className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-300 dark:border-gray-600 rounded-md hover:border-blue-600 dark:hover:border-blue-400"
            >
              📥 Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
