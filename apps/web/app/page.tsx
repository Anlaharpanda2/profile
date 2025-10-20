'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Mail, Linkedin, Code, Palette, Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./components/Scene3D'), { ssr: false });

export default function ProfilePage() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const backendSkills = [
    { name: 'Express.js', level: 90, color: 'from-green-400 to-emerald-600', icon: '⚡' },
    { name: 'Next.js API', level: 95, color: 'from-slate-400 to-gray-600', icon: '▲' },
    { name: 'Django', level: 85, color: 'from-green-600 to-teal-600', icon: '🐍' },
    { name: 'Laravel', level: 88, color: 'from-red-400 to-orange-600', icon: '🔷' },
    { name: 'Node.js', level: 92, color: 'from-lime-400 to-green-600', icon: '💚' },
    { name: 'REST API', level: 90, color: 'from-blue-400 to-indigo-600', icon: '🔌' }
  ];

  const frontendSkills = [
    { name: 'Next.js', level: 95, color: 'from-slate-300 to-slate-600', icon: '▲' },
    { name: 'Nuxt.js', level: 90, color: 'from-green-400 to-emerald-600', icon: '💚' },
    { name: 'React', level: 93, color: 'from-blue-400 to-cyan-600', icon: '⚛️' },
    { name: 'Vue.js', level: 92, color: 'from-teal-400 to-green-600', icon: '🟢' },
    { name: 'TypeScript', level: 88, color: 'from-blue-500 to-blue-700', icon: '📘' },
    { name: 'Tailwind CSS', level: 95, color: 'from-cyan-400 to-blue-600', icon: '🎨' }
  ];

  const otherSkills = [
    { name: 'UI/UX Design', level: 95, color: 'from-purple-400 to-pink-600', icon: '🎨' },
    { name: 'Figma', level: 90, color: 'from-orange-400 to-red-600', icon: '🎯' },
    { name: 'Project Management', level: 93, color: 'from-yellow-400 to-orange-600', icon: '📊' },
    { name: 'Leadership', level: 90, color: 'from-indigo-400 to-purple-600', icon: '👑' }
  ];

  const experiences = [
    {
      title: 'Project Manager',
      company: 'DP3AP2KB Provinsi Sumatera Barat',
      period: 'Maret 2025 - Juli 2025 (5 bulan)',
      description: 'Led a team of four in the development of PEPSIKUBURGER, a government website under DP3AP2KB (Dinas Pemberdayaan Perempuan dan Perlindungan Anak, Pengendalian Penduduk, dan Keluarga Berencana), West Sumatra Province. The project covered over 5,000 women participants in economic empowerment training programs. Managed the entire process from planning to deployment, coordinated the team, liaised with government stakeholders, and ensured the project was delivered on time while meeting accessibility, usability, and data management standards.',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: 'Freelance Illustrator',
      company: 'Anla.id (Shopee Brand)',
      period: 'Maret 2022 - Desember 2024 (2 tahun 10 bulan)',
      description: 'Founder & Freelance Illustrator anla.id (Shopee Brand). Specialized in high-quality vector artwork using CorelDRAW and Inkscape. Created expressive caricature illustrations using Krita for diverse client needs. Managed full project lifecycle independently — from concept development to final delivery. Ensured consistent visual quality, timely execution, and effective client communication with 300+ satisfied clients.',
      icon: <Palette className="w-6 h-6" />
    }
  ];

  const certifications = [
    { name: 'AWS Academy Graduate - AWS Academy Cloud Developing', issuer: 'AWS Academy' },
    { name: 'EF SET English Certificate', issuer: 'B2 Upper Intermediate (51/100)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 3D Scene Background */}
      <div className="fixed inset-0 opacity-30">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-500/50 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="mb-20 pb-16 border-b border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
            {/* Profile Image - Now on the right */}
            <motion.div 
              className="relative group lg:flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
            >
              {/* Glow effect behind the image */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-3xl opacity-60 group-hover:opacity-80 transition duration-500"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative">
                <motion.div 
                  className="w-96 h-96 lg:w-[450px] lg:h-[450px] flex items-center justify-center"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: -5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="/profile.png" 
                    alt="Anla Harpanda" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(139,92,246,0.7)] transition-all duration-500 group-hover:drop-shadow-[0_25px_60px_rgba(236,72,153,0.8)]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect width='256' height='256' fill='%234f46e5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='100' fill='white'%3EAH%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full p-4 shadow-xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Profile Info - Now on the left */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-sm text-purple-300 font-medium">Available for Projects</span>
              </motion.div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Anla Harpanda
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Full Stack Developer | Backend (Express.js, Django, Laravel) | Frontend (Next.js, Nuxt.js, React, Vue.js)
              </motion.p>
              <motion.p 
                className="text-gray-400 mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Passionate Full Stack Developer based in Padang, West Sumatra, Indonesia. Experienced in building scalable web applications with modern backend frameworks (Express.js, Django, Laravel) and cutting-edge frontend technologies (Next.js, Nuxt.js, React, Vue.js). Specialized in creating beautiful, performant applications with 300+ satisfied clients.
              </motion.p>
              
              {/* Contact Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.a 
                  href="mailto:anlaharpanda2@gmail.com" 
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative flex items-center gap-2 text-white font-medium">
                    <Mail className="w-5 h-5" />
                    <span>Contact Me</span>
                  </div>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/anlaharpanda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition duration-300" />
                    <span>LinkedIn</span>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Code className="w-10 h-10 text-purple-400" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Full Stack Developer Skills
              </h2>
            </motion.div>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Specialized in building end-to-end web applications with modern technologies
            </p>
          </div>

          {/* Backend Skills */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                <span className="text-2xl">🔧</span>
                <h3 className="text-2xl font-bold text-white">Backend Development</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
                    transformStyle: "preserve-3d"
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition duration-300" 
                    animate={{
                      background: hoveredSkill === index 
                        ? `linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))` 
                        : `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{skill.icon}</span>
                        <motion.h3 
                          className="text-lg font-semibold text-white"
                          animate={{
                            scale: hoveredSkill === index ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {skill.name}
                        </motion.h3>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frontend Skills */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
                <span className="text-2xl">🎨</span>
                <h3 className="text-2xl font-bold text-white">Frontend Development</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  onMouseEnter={() => setHoveredSkill(100 + index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateX: -5,
                    rotateY: -5,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                    transformStyle: "preserve-3d"
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition duration-300" 
                    animate={{
                      background: hoveredSkill === 100 + index 
                        ? `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3))` 
                        : `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{skill.icon}</span>
                        <motion.h3 
                          className="text-lg font-semibold text-white"
                          animate={{
                            scale: hoveredSkill === 100 + index ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {skill.name}
                        </motion.h3>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Skills */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                <span className="text-2xl">✨</span>
                <h3 className="text-2xl font-bold text-white">Design & Leadership</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  onMouseEnter={() => setHoveredSkill(200 + index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateZ: 3,
                    boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)",
                    transformStyle: "preserve-3d"
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition duration-300" 
                    animate={{
                      background: hoveredSkill === 200 + index 
                        ? `linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))` 
                        : `linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{skill.icon}</span>
                        <motion.h3 
                          className="text-lg font-semibold text-white"
                          animate={{
                            scale: hoveredSkill === 200 + index ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {skill.name}
                        </motion.h3>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Experience Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Briefcase className="w-8 h-8 text-pink-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Experience</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="group relative p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
                }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-t-xl"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
                <div className="flex gap-4">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {exp.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-purple-300 font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                className="group relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative">
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
                      <p className="text-gray-400">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="w-8 h-8 text-green-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Education</h2>
          </div>
          <motion.div 
            className="group relative p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative flex items-start gap-4">
              <motion.div 
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: -360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Politeknik Negeri Padang</h3>
                <p className="text-green-300 font-medium mb-1">Teknologi Informasi</p>
                <p className="text-gray-400">Agustus 2023 - Agustus 2027</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-gray-400 mb-4">Based in Padang, West Sumatra, Indonesia</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:anlaharpanda2@gmail.com" className="text-gray-400 hover:text-purple-400 transition duration-300">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/anlaharpanda" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}