"use client";

import { personalData } from "@/utils/data/personal-data";
import dynamic from 'next/dynamic';
import Blog from "./components/homepage/blog";

// Dynamically import components that need browser APIs
const AboutSection = dynamic(() => import("./components/homepage/about"), {
  ssr: false
});
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), {
  ssr: false
});
const Experience = dynamic(() => import("./components/homepage/experience"), {
  ssr: false
});
const Skills = dynamic(() => import("./components/homepage/skills"), {
  ssr: false
});
const Projects = dynamic(() => import("./components/homepage/projects"), {
  ssr: false
});
const Education = dynamic(() => import("./components/homepage/education"), {
  ssr: false
});
const ContactSection = dynamic(() => import("./components/homepage/contact"), {
  ssr: false
});

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {/* <Blog blogs={blogs} /> */}
      <ContactSection />
    </div>
  );
}