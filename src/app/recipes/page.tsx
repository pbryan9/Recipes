import AllRecipesLeftNav from './_components/LeftNav';
import RecipeCard from './_components/RecipeCard';
import SectionHeader from './_components/SectionHeader';

export default function page() {
  return (
    <>
      <SectionHeader sectionTitle='All Recipes' />
      <section className='flex justify-between items-start h-[calc(100vh_-_80px_-_128px)] w-full'>
        <AllRecipesLeftNav />
        <main className='basis-8/12 min-h-full flex flex-col'>
          <RecipeCard key='1' title='Chicken Soup' author='Mom' />
          <RecipeCard key='2' title='Chocolate Cake' author='Steffy' />
          <RecipeCard key='3' title='Brisket' author='GB' />
          <RecipeCard key='4' title='Chex Mix' author='Amber' />
        </main>
      </section>
    </>
  );
}
