import { getProfile } from '@/lib/services/profileService';
import About from './sections/home/About';
import Contact from './sections/home/Contact';
import ExperienceSection from './sections/home/ExperienceSection';
import Hero from './sections/home/Hero';
import ProjectsSection from './sections/home/ProjectsSection';
import Skills from './sections/home/Skills';
import { getProjects } from '@/lib/services/projectService';
import { getExperience } from '@/lib/services/experienceService';

export default async function Home() {
  const profile = await getProfile();
  const projects = await getProjects();
  const experience = await getExperience();

  return (
    <div>
      <Hero />
      {profile?.about && <About id='about' data={profile.about} />}
      {profile?.skills && <Skills id='skills' data={profile.skills} />}
      {projects && <ProjectsSection id='projects' data={projects} />}
      {experience && <ExperienceSection id='experience' data={experience} />}
      {profile?.contact && <Contact id='contact' data={profile.contact} />}
    </div>
  );
}
