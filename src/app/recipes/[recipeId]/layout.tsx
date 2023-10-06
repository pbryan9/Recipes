import type { ReactNode } from 'react';
import SectionHeader from '../_components/SectionHeader';
import { Metadata } from 'next';
import { getRecipe } from '@/lib/db/recipes/getRecipe';
import { getAllRecipes } from '@/lib/db/recipes/getAllRecipes';

type CreateNewRecipeLayoutProps = {
  params: {
    recipeId: string;
  };
  children: ReactNode;
};

export default async function CreateNewRecipeLayout({
  params,
  children,
}: CreateNewRecipeLayoutProps) {
  const { recipeId } = params;

  const recipe = await getRecipe(recipeId);

  return (
    <>
      <SectionHeader sectionTitle={recipe?.title || 'Viewing Recipe'} />
      <section className='flex justify-between items-start h-[calc(100vh_-_80px_-_128px)] overflow-y-hidden w-full'>
        {children}
      </section>
    </>
  );
}

type MetadataProps = {
  params: {
    recipeId: string;
  };
};

export async function generateStaticParams() {
  const recipes = await getAllRecipes();

  return recipes.map((recipe) => recipe.id);
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { recipeId } = params;

  const recipe = await getRecipe(recipeId);

  return {
    title: `Recipe: ${recipe?.title}` || 'Viewing Recipe',
  };
}
