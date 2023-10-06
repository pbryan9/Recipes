import Link from 'next/link';
import { Recipe } from '../../../../types';
import TagBadge from './TagBadge';

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const {
    title,
    author: { username: author },
  } = recipe;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className='recipe-card w-full h-32 flex items-center flex-shrink-0 justify-between border border-gray-400 rounded-md p-6'
    >
      <div className='flex flex-col items-start justify-center h-full'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        {author && <aside className='text-xs'>by {author}</aside>}
      </div>
      {recipe.tags?.length! > 0 &&
        recipe.tags!.map((tag) => (
          <TagBadge key={tag.description}>{tag.description}</TagBadge>
        ))}
    </Link>
  );
}
