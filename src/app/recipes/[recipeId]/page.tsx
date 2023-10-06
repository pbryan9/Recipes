import { getRecipe } from '@/lib/db/recipes/getRecipe';
import LeftNav from '../_components/LeftNav';
import StandardMainContainer from '@/app/components/StandardMainContainer';
import { getAllRecipes } from '@/lib/db/recipes/getAllRecipes';
import LeftNavCard from '../_components/LeftNavCard';

type SingleRecipeViewProps = {
  params: {
    recipeId: string;
  };
};

export default async function SingleRecipeView({
  params: { recipeId },
}: SingleRecipeViewProps) {
  const recipe = await getRecipe(recipeId);

  return (
    <>
      <LeftNav>
        <h2 className='text-4xl'>Ingredients</h2>
        {recipe?.ingredientGroups.map((group) => (
          <article className='w-full h-fit flex flex-col gap-0 mb-4'>
            {group.groupTitle !== '' && (
              <h3 className='text-3xl self-start font-bold text-gray-800 px-4'>
                {group.groupTitle}
              </h3>
            )}
            {group.ingredients.map((item) => (
              <LeftNavCard>{item.description}</LeftNavCard>
            ))}
          </article>
        ))}
      </LeftNav>
      <StandardMainContainer>
        {recipe?.procedureGroups.map((group, idx) => (
          <article
            key={group.id}
            className='w-full h-fit flex flex-col justify-start items-center gap-4 mb-6 p-4 border border-gray-400 rounded-md'
          >
            {group.groupTitle !== '' && (
              <h2 className='text-3xl self-end font-bold'>
                {group.groupTitle}
              </h2>
            )}
            {recipe?.procedureGroups[idx].procedureSteps.map((step) => (
              <div
                key={step.id}
                className='text-xl w-full text-white bg-gray-800 flex justify-start items-center p-6 rounded-md'
              >
                <p>{step.description}</p>
              </div>
            ))}
          </article>
        ))}
      </StandardMainContainer>
    </>
  );
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();

  return recipes.map((recipe) => recipe.id);
}
