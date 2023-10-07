import NavCard from './LeftNavCard';

export default function CreateNewRecipesLeftNav() {
  const categories = ['Favorites', 'By Mealtime', 'By Role', 'All Tags'];

  return (
    <nav className='h-full basis-4/12 bg-slate-400 overflow-y-auto flex flex-col justify-start gap-0 border-r border-gray-400'>
      <NavCard>Creating a new recipe</NavCard>
    </nav>
  );
}
