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
import CreateSideMenu from './Create_SideMenu';
import GroupsListing from './GroupsListing';
import ButtonContainer from './ButtonContainer';
import Button from './Button';

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

type CreateNewRecipeViewProps = {
  children: React.ReactNode;
};

export default function CreateNewRecipeView({
  children,
}: CreateNewRecipeViewProps) {
  const router = useRouter();
  const { user } = useUser();

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

  const submitForm = handleSubmit(onSubmit);
  const resetForm = () => reset(defaultValues);

  async function onSubmit(data: FormInputs) {
    setButtonDisabled(true);

    data.author = user?.username || 'anonymous';

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
    <>
      <CreateSideMenu {...{ resetForm, submitForm, children }} />
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

          <section className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'>
            <h2 className='col-span-full text-4xl'>Submit Recipe</h2>
            <ButtonContainer>
              <Button
                // onClick={handleSubmit(onSubmit)}
                onClick={submitForm}
                disabled={buttonDisabled}
              >
                Submit Recipe
              </Button>
            </ButtonContainer>
          </section>
        </form>
      </StandardMainContainer>
    </>
  );
}
