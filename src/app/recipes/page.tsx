'use client';

import useRecipeFilter from '@/lib/hooks/useRecipeFilter';

import StandardMainContainer from '../components/StandardMainContainer';
import RecipeCard from './_components/RecipeCard';
import LeftNav from '../components/LeftNav';
import SectionHeader from '../components/SectionHeader';
import SearchCard from './_components/SearchCard';

export default function AllRecipesView() {
  const { isLoading, searchTerm, setSearchTerm, filteredRecipes } =
    useRecipeFilter();

  const { allRecipes } = filteredRecipes;

  function presentFilteredResults() {
    const headingMap: Record<string, string> = {
      ingredientMatches: 'Ingredient Matches',
      tagMatches: 'Tag Matches',
      titleMatches: 'Title Matches',
      procedureMatches: 'Procedure Matches',
    };

    let results = [];

    for (let heading in headingMap) {
      if (filteredRecipes[heading].length > 0)
        results.push(
          <section
            key={heading}
            className='border border-gray-400 rounded-md p-4 w-full flex flex-col gap-4'
          >
            <h2 className='text-3xl font-bold'>{headingMap[heading]}</h2>
            {filteredRecipes[heading].map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        );
    }

    return results;
  }

  return (
    <>
      <SectionHeader
        sectionTitle={
          searchTerm === '' ? 'All Recipes' : `Recipes matching: ${searchTerm}`
        }
      />
      <section className='flex justify-between items-start h-[calc(100vh_-_80px_-_128px)] w-full'>
        <LeftNav>
          <SearchCard {...{ searchTerm, setSearchTerm }} />
        </LeftNav>
        <StandardMainContainer>
          <div className='w-full flex flex-col gap-4'>
            {isLoading && <h1>LOADING</h1>}

            {allRecipes.length > 0 && (
              <section className='border border-gray-400 rounded-md p-4 w-full flex flex-col gap-4'>
                <h2 className='text-3xl font-bold'>All Recipes</h2>
                {allRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </section>
            )}

            {allRecipes.length === 0 && presentFilteredResults()}
          </div>
        </StandardMainContainer>
      </section>
    </>
  );
}
