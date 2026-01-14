import About from './components/About';
import Contact from './components/Contact';
import ExperienceSection from './components/ExperienceSection';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import Skills from './components/Skills';

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
