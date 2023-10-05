'use client';

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import z from 'zod';

import StandardMainContainer from '@/app/components/StandardMainContainer';
import IngredientGroupsListing from './_components/IngredientGroupsListing';
import GroupsListing from './_components/GroupsListing';
import ButtonContainer from './_components/ButtonContainer';
import Button from './_components/Button';

const uomValues = [
  'OZ',
  'FLOZ',
  'LB',
  'G',
  'C',
  'TSP',
  'TBSP',
  'BUNCH',
  'CAN',
  'BAG',
  'CONTAINER',
  'OTHER',
] as const;

const formInputs = z.object({
  title: z.string(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  ingredientGroups: z
    .object({
      groupTitle: z.string(),
      description: z.string().optional(),
      ingredients: z
        .object({
          qty: z.number().positive().optional(),
          uom: z.enum(uomValues).optional(),
          description: z.string(),
        })
        .array(),
    })
    .array(),
  procedureGroups: z
    .object({
      groupTitle: z.string(),
      description: z.string().optional(),
      procedureSteps: z
        .object({
          description: z.string(),
          timer: z.number().positive().int().optional(),
        })
        .array(),
    })
    .array(),
  tags: z
    .object({
      description: z.string(),
    })
    .array()
    .optional(),
});

export type FormInputs = z.infer<typeof formInputs>;

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
  const inputClasses = 'col-span-6 rounded-md h-full text-gray-900 px-4';
  const labelClasses = 'col-span-2';

  const { register, handleSubmit, control } = useForm<FormInputs>({
    defaultValues,
  });

  function onSubmit(data: FormInputs) {
    console.log('submit button clicked');
    console.log('data:', data);
  }

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
            <Button onClick={handleSubmit(onSubmit)}>Submit Recipe</Button>
          </ButtonContainer>
        </section>
      </form>
    </StandardMainContainer>
  );
}
