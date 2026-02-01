import { Metadata } from 'next';
import { Suspense } from "react";
import Hero from "./components/sections/Hero";
import Navbar from "@/app/components/sections/Navbar";
import Projects from '@/app/components/sections/Projects';
import About from '@/app/components/sections/About';
import CTA from '@/app/components/sections/CTA';
import Footer from '@/app/components/sections/Footer';
import FixedSocialBar from '@/app/components/FixedSocialBar';
import { PersonStructuredData, WebsiteStructuredData } from '@/app/components/StructuredData';

export const metadata: Metadata = {
  title: "Home | Anla Harpanda - Full Stack Web Developer",
  description: "Welcome to my portfolio! I'm a Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, Vue.js, and React. Based in Padang, Indonesia.",
  keywords: "full stack developer, web developer, UI/UX designer, Next.js, React, Vue.js, Laravel, Express.js, Anla Harpanda, Indonesia",
  openGraph: {
    title: "Home | Anla Harpanda - Full Stack Web Developer",
    description: "Welcome to my portfolio! I'm a Full Stack Web Developer & UI/UX Designer specializing in modern web technologies.",
    url: "https://anla.my.id",
    siteName: "Anla Harpanda Portfolio",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <PersonStructuredData
        name="Anla Harpanda"
        jobTitle="Full Stack Web Developer & UI/UX Designer"
        description="Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, Vue.js, and React. Based in Padang, Indonesia."
        url="https://anla.my.id"
        image="https://anla.my.id/pfp.webp"
        email="anlaharpanda@gmail.com"
        sameAs={[
          "https://www.linkedin.com/in/anlaharpanda",
          "https://github.com/itsanla"
        ]}
      />
      <WebsiteStructuredData />
      <Navbar />
      <FixedSocialBar />
      <section id="hero" className="scroll-mt-16">
        <Hero />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <section id="projects" className="scroll-mt-16">
          <Projects />
        </section>
        <section id="about" className="scroll-mt-16">
          <About />
        </section>
        <section id="contact" className="scroll-mt-16">
          <CTA />
          <Footer />
        </section>
      </Suspense>
    </div>
  );
}
