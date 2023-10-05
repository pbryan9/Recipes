type SingleRecipeViewProps = {
  params: {
    recipeId: string;
  };
};

export default function SingleRecipeView({
  params: { recipeId },
}: SingleRecipeViewProps) {
  console.log('recipe id:', recipeId);

  return (
    <>
      <nav className='basis-4/12'></nav>
      <main className='basis-8/12'></main>
    </>
  );
}
