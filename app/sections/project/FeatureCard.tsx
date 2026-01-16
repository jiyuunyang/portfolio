type Props = {
  data: { title: string; details: string[] };
};

export default function FeatureCard({ data }: Props) {
  return (
    <article className='pb-3'>
      <h3 className='font-bold'>{data.title}</h3>
      <ul className='pl-5 list-disc'>
        {data.details.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
