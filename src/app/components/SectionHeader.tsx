export default function SectionHeader() {
  return (
    <header className='w-full h-32 border-b border-gray-400 flex justify-between items-center px-6'>
      <section className='left-section'>
        <article className='timer text-5xl'>4:29:38</article>
      </section>
      <section className='right-section'>
        <article className='timer text-[4rem] font-bold'>All Recipes</article>
      </section>
    </header>
  );
}
