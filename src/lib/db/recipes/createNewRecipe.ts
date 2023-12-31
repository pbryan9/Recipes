'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import prisma from '..';
import {
  type FormInputs,
  newRecipeFormInputSchema,
} from '@/lib/validators/newRecipeFormInput';

export async function createNewRecipe(formInputs: FormInputs) {
  const validatedFormInputs = newRecipeFormInputSchema.parse(formInputs);

  // clean up object
  if (!validatedFormInputs.cookTime) delete validatedFormInputs.cookTime;
  if (!validatedFormInputs.prepTime) delete validatedFormInputs.prepTime;
  if (!validatedFormInputs.tags?.length) delete validatedFormInputs.tags;

  for (let group of validatedFormInputs.ingredientGroups) {
    if (!group.description) delete group.description;

    for (let ing of group.ingredients) {
      if (!ing.uom) delete ing.uom;
      if (!ing.qty) delete ing.qty;
    }
  }

  for (let group of validatedFormInputs.procedureGroups) {
    if (!group.description) delete group.description;

    for (let step of group.procedureSteps) {
      if (!step.timer) delete step.timer;
    }
  }

  try {
    // create initial recipe (ingredient/procedure groups at [0] only since we cannot nest createMany calls)

    let newRecipe = await prisma.recipe.create({
      data: {
        title: validatedFormInputs.title,
        cookTime: validatedFormInputs.cookTime,
        prepTime: validatedFormInputs.prepTime,
        author: {
          connectOrCreate: {
            // TODO: derive user ID or username
            where: {
              username: validatedFormInputs.author,
            },
            create: {
              username: validatedFormInputs.author || 'anonymous',
            },
          },
        },
        tags: {},
        ingredientGroups: {
          create: {
            groupTitle:
              validatedFormInputs.ingredientGroups[0].groupTitle || undefined,
            description:
              validatedFormInputs.ingredientGroups[0].description || undefined,
            ingredients: {
              createMany: {
                data: validatedFormInputs.ingredientGroups[0].ingredients,
              },
            },
          },
        },
        procedureGroups: {
          create: {
            groupTitle:
              validatedFormInputs.procedureGroups[0].groupTitle || undefined,
            description:
              validatedFormInputs.procedureGroups[0].description || undefined,
            procedureSteps: {
              createMany: {
                data: validatedFormInputs.procedureGroups[0].procedureSteps,
              },
            },
          },
        },
      },
    });

    // now circle back & append any additional ingredient/procedure groups

    // use a flag to indicate whether we should re-fetch the recipe before returning it

    console.log('initial recipe created');

    for (let group of validatedFormInputs.ingredientGroups.slice(1)) {
      console.log('adding an ingredient group');
      // TODO: there may be a group.createMany angle on this, since I know the recipeId & therefore don't need to nest-create
      // await prisma.ingredientGroup.create({
      //   data: {
      //     recipeId: newRecipe.id
      //   }
      // })

      await prisma.recipe.update({
        where: { id: newRecipe.id },
        data: {
          ingredientGroups: {
            create: {
              description: group.description,
              groupTitle: group.groupTitle,
              ingredients: {
                createMany: {
                  data: group.ingredients,
                },
              },
            },
          },
        },
      });
    }

    for (let group of validatedFormInputs.procedureGroups.slice(1)) {
      console.log('adding a proc group');
      await prisma.recipe.update({
        where: { id: newRecipe.id },
        data: {
          procedureGroups: {
            create: {
              description: group.description,
              groupTitle: group.groupTitle,
              procedureSteps: {
                createMany: {
                  data: group.procedureSteps,
                },
              },
            },
          },
        },
      });
    }

    // create/connect tags to recipe
    if (validatedFormInputs.tags)
      await prisma.recipe.update({
        where: {
          id: newRecipe.id,
        },
        data: {
          tags: {
            connect: validatedFormInputs.tags!.map((tag) => ({ id: tag.id })),
          },
        },
      });

    console.log('fetching final recipe');

    const finalRecipe = await prisma.recipe.findUnique({
      where: { id: newRecipe.id },
      include: {
        author: true,
        tags: true,
        ingredientGroups: {
          include: {
            ingredients: true,
          },
        },
        procedureGroups: {
          include: {
            procedureSteps: true,
          },
        },
      },
    });

    console.log('trying to revalidate paths');
    revalidatePath('/');
    revalidatePath('/app/recipes');
    revalidateTag('all-recipes');
    revalidatePath('/api/recipes', 'page');
    revalidatePath('/recipes');
    console.log('after trying to revalidate paths');

    return finalRecipe;
  } catch (err) {
    console.log('error creating new recipe');
    console.log(err);
  }
}
