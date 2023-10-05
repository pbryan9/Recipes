import TagBadge from './TagBadge';

type RecipeCardProps = {
  title: string;
  author?: string;
};

export default function RecipeCard({
  title = 'Dummy Recipe Name',
  author = 'Steffy',
}: RecipeCardProps) {
  return (
    <article className='recipe-card w-full h-32 flex items-center flex-shrink-0 justify-between border border-gray-400 rounded-md p-6'>
      <section>
        <h2 className='text-2xl font-bold'>{title}</h2>
        {author && <aside className='text-xs'>by {author}</aside>}
        <TagBadge>Vegan</TagBadge>
      </section>
    </article>
  );
}
