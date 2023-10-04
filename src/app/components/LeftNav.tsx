import CategoryCard from './CategoryCard';

export default function LeftNav() {
  const categories = ['Favorites', 'By Mealtime', 'By Role', 'All Tags'];

  return (
    <nav className='h-full basis-4/12 bg-slate-400 overflow-y-auto flex flex-col justify-start gap-0 border-r border-gray-400'>
      {categories.map((category) => (
        <CategoryCard>{category}</CategoryCard>
      ))}
    </nav>
  );
}
