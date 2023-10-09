'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';

import {
  newRecipeFormInputSchema,
  type FormInputs,
} from '@/lib/validators/newRecipeFormInput';

import StandardMainContainer from '@/app/components/StandardMainContainer';

import { createNewRecipe } from '@/lib/db/recipes/createNewRecipe';
import CreateSideMenu from './_components/Create_SideMenu';
import GroupsListing from './_components/GroupsListing';
import { Tag } from '.prisma/client';
import SelectedTags from './_components/SelectedTags';

const defaultValues: FormInputs = {
  title: '',
  author: undefined,
  cookTime: '' as unknown as undefined,
  prepTime: '' as unknown as undefined,
  ingredientGroups: [
    {
      groupTitle: '',
      description: '',
      ingredients: [
        {
          qty: undefined,
          uom: undefined,
          description: '',
        },
      ],
    },
  ],
  procedureGroups: [
    {
      groupTitle: '',
      description: '',
      procedureSteps: [
        {
          description: '',
          timer: undefined,
        },
      ],
    },
  ],
};

export default function CreateNewRecipeView() {
  const router = useRouter();
  const { user } = useUser();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Map<string, Tag>>();

  const inputClasses = 'col-span-6 rounded-md h-full text-gray-900 px-4';
  const labelClasses = 'col-span-2';

  const { register, handleSubmit, control, reset } = useForm<FormInputs>({
    defaultValues,
    resolver: zodResolver(newRecipeFormInputSchema),
  });

  const submitForm = handleSubmit(onSubmit);

  function resetForm() {
    setSelectedTags(undefined);
    reset(defaultValues);
  }

  async function onSubmit(data: FormInputs) {
    setButtonDisabled(true);

    data.author = user?.username || 'anonymous';

    if (selectedTags?.size && selectedTags.size > 0) {
      data.tags = Array.from(selectedTags.values()) as typeof data.tags;
    }

    const res = await fetch('/api/restricted/create-new-recipe', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    console.log('fetch res:', res);

    // ! server actions aren't revalidating correctly
    // createNewRecipe(data).then((res) => {
    //   reset(defaultValues);
    //   setButtonDisabled(false);
    //   router.push(`/recipes/${res?.id}`);
    // });
  }

  console.log(selectedTags?.size);

  return (
    <>
      <CreateSideMenu {...{ resetForm, submitForm, toggleTag, selectedTags }} />
      <StandardMainContainer>
        <form className='flex flex-col items-start text-2xl font-bold gap-y-4 w-full h-fit min-h-full'>
          <section className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'>
            <label htmlFor='title' className={labelClasses + ' text-4xl'}>
              Recipe Title
            </label>
            <input
              type='text'
              id='title'
              {...register('title')}
              className={inputClasses}
            />
            {selectedTags && selectedTags.size > 0 && (
              <SelectedTags
                removeSelectedTag={toggleTag}
                selectedTags={selectedTags}
              />
            )}
            <label htmlFor='prepTime' className={labelClasses}>
              Prep Time
            </label>
            <input
              type='text'
              id='prepTime'
              {...register('prepTime')}
              className={inputClasses}
            />
            <label htmlFor='cookTime' className={labelClasses}>
              Cook Time
            </label>
            <input
              type='text'
              id='cookTime'
              {...register('cookTime')}
              className={inputClasses}
            />
          </section>

          <section
            id='ingredients-section'
            className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center border border-gray-400 rounded-md p-4'
          >
            <h2 className='col-span-full text-4xl'>Ingredients</h2>
            <GroupsListing
              {...{ control, register, groupType: 'ingredientGroups' }}
            />
          </section>

          <section
            id='procedure-section'
            className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center border border-gray-400 rounded-md p-4'
          >
            <h2 className='col-span-full text-4xl'>Procedure</h2>
            <GroupsListing
              {...{ control, register, groupType: 'procedureGroups' }}
            />
          </section>
        </form>
      </StandardMainContainer>
    </>
  );

  function toggleTag(tag: Tag) {
    let tempTags = new Map(selectedTags);

    if (tempTags.has(tag.id)) tempTags.delete(tag.id);
    else tempTags.set(tag.id, tag);

    setSelectedTags(tempTags);

    console.log('new tags:', tempTags);
  }
}
