import prisma from '..';

export async function getRecipe(recipeId: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      author: true,
      notes: true,
      ingredientGroups: { include: { ingredients: true } },
      procedureGroups: { include: { procedureSteps: true } },
    },
  });

  return recipe;
}
