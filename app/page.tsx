import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Skills from './components/Skills';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
