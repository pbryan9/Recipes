'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  newRecipeFormInputSchema,
  type FormInputs,
} from '@/lib/validators/newRecipeFormInput';

import StandardMainContainer from '@/app/components/StandardMainContainer';
import GroupsListing from './_components/GroupsListing';
import ButtonContainer from './_components/ButtonContainer';
import Button from './_components/Button';
import { createNewRecipe } from '@/lib/db/recipes/createNewRecipe';

const defaultValues: FormInputs = {
  title: '',
  cookTime: undefined,
  prepTime: undefined,
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

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const inputClasses = 'col-span-6 rounded-md h-full text-gray-900 px-4';
  const labelClasses = 'col-span-2';

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues,
    resolver: zodResolver(newRecipeFormInputSchema),
  });

  async function onSubmit(data: FormInputs) {
    setButtonDisabled(true);

    createNewRecipe(data).then((res) => {
      reset(defaultValues);
      setButtonDisabled(false);
      router.push(`/recipes/${res?.id}`);
    });
  }

  // useEffect(() => {
  //   console.log(errors);
  // }, [Object.keys(errors)]);

  return (
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
          className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'
        >
          <h2 className='col-span-full text-4xl'>Ingredients</h2>
          <GroupsListing
            {...{ control, register, groupType: 'ingredientGroups' }}
          />
        </section>

        <section
          id='procedure-section'
          className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'
        >
          <h2 className='col-span-full text-4xl'>Procedure</h2>
          <GroupsListing
            {...{ control, register, groupType: 'procedureGroups' }}
          />
        </section>

        <section className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'>
          <h2 className='col-span-full text-4xl'>Submit Recipe</h2>
          <ButtonContainer>
            <Button onClick={handleSubmit(onSubmit)} disabled={buttonDisabled}>
              Submit Recipe
            </Button>
          </ButtonContainer>
        </section>
      </form>
    </StandardMainContainer>
  );
}
