import About from './sections/home/About';
import Contact from './sections/home/Contact';
import ExperienceSection from './sections/home/ExperienceSection';
import Hero from './sections/home/Hero';
import ProjectsSection from './sections/home/ProjectsSection';
import Skills from './sections/home/Skills';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <ExperienceSection />
      <Contact />
    </div>
  );
}
