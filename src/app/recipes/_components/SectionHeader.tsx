type SectionHeaderProps = {
  sectionTitle: string;
};

export default function SectionHeader({ sectionTitle }: SectionHeaderProps) {
  return (
    <header className='w-full h-32 border-b border-gray-400 flex justify-between items-center px-6'>
      <section className='left-section'>
        <article className='timer text-5xl'>4:29:38</article>
      </section>
      <section className='right-section'>
        <article className='timer text-[4rem] font-bold'>
          {sectionTitle}
        </article>
      </section>
    </header>
  );
}
