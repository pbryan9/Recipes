import { getAllRecipes } from '@/lib/db/recipes/getAllRecipes';
import StandardMainContainer from '../components/StandardMainContainer';
import LeftNav from './_components/LeftNav';
import RecipeCard from './_components/RecipeCard';
import SectionHeader from './_components/SectionHeader';

export default async function AllRecipesView() {
  const recipes = await getAllRecipes();

  return (
    <>
      <SectionHeader sectionTitle='All Recipes' />
      <section className='flex justify-between items-start h-[calc(100vh_-_80px_-_128px)] w-full'>
        <LeftNav>stuff</LeftNav>
        <StandardMainContainer>
          <div className='w-full flex flex-col gap-4'>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </StandardMainContainer>
      </section>
    </>
  );
}
