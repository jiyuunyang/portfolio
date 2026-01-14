import ExperienceCard from './ExperienceCard';

export default function ExperienceSection() {
  return (
    <section
      id='experience'
      className='px-7 pt-4 pb-6 tb:px-9 tb:pt-8 tb:pb-10 pc:px-13 pc:pt-9 pc:pb-12 bg-gray-800'
    >
      <h2 className='text-xl tb:text-2xl font-bold text-gray-50'>Experience</h2>
      <ExperienceCard />
      <ExperienceCard />
      <ExperienceCard noBorderBottom />
    </section>
  );
}
