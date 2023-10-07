import CreateNewRecipeView from './_components/CreateNewRecipeView';
import CreateTagsContainer from './_components/Create_TagsContainer';

export default function CreateNewRecipeWrapper() {
  // A little strange: I'm passing CreateTagsContainer here as a child so that I can generate it on the server.
  // It won't be used until a second layer down -- it's drilled down through the left nav component.

  return (
    <>
      <CreateNewRecipeView>
        <CreateTagsContainer />
      </CreateNewRecipeView>
    </>
  );
}
