import RecipeCard from './components/RecipeCard';

export default function Home() {
  return (
    <main className='p-6 basis-8/12 flex flex-col gap-5 overflow-y-auto h-full'>
      <RecipeCard title='Chicken Soup' author='Mom' />
      <RecipeCard title='Chocolate Cake' author='Steffy' />
      <RecipeCard title='Brisket' author='GB' />
      <RecipeCard title='Chex Mix' author='Amber' />
    </main>
  );
}
