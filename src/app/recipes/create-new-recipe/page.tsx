'use client';

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import z from 'zod';

import StandardMainContainer from '@/app/components/StandardMainContainer';
import IngredientGroupsListing from './_components/IngredientGroupsListing';

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
          description: z.string(),
          uom: z.enum(uomValues).optional(),
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

export type FormInputs = z.infer<typeof formInputs>;

export default function CreateNewRecipeView() {
  const inputClasses = 'col-span-6 rounded-md h-full text-gray-900 px-4';
  const labelClasses = 'col-span-2';

  const { register, handleSubmit, control } = useForm<FormInputs>({
    defaultValues,
  });

  return (
    <StandardMainContainer>
      <form className='flex flex-col items-start text-2xl font-bold gap-y-4 w-full h-fit min-h-full'>
        <section className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'>
          <label htmlFor='title' className={labelClasses + ' text-3xl'}>
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
          <h2 className='col-span-full text-3xl'>Ingredients</h2>
          <IngredientGroupsListing {...{ control, register }} />
          {/* <div className='ingredient-group grid grid-cols-8 col-span-full h-full'>
            <input
              type='number'
              className='col-span-1 rounded-l-md border-r border-gray-400 text-gray-900 text-center h-full'
            />
            <select className='col-span-1 border-r border-gray-400 text-gray-900 text-center h-full'>
              <option></option>
              <option>oz</option>
              <option>fl. oz</option>
              <option>g</option>
              <option>lb</option>
              <option>ml</option>
              <option>cup</option>
            </select>
            <input
              type='text'
              className='col-span-5 rounded-r-md text-gray-900 px-4 h-full'
            />
            <div className='ingredient-buttons col-span-1 flex justify-center gap-4 items-center'>
              <div className='w-8 aspect-square bg-white'></div>
            </div>
          </div>
          <div className='ingredient-group grid grid-cols-8 col-span-full h-full'>
            <input
              type='number'
              className='col-span-1 rounded-l-md border-r border-gray-400 text-gray-900 text-center h-full'
            />
            <select className='col-span-1 border-r border-gray-400 text-gray-900 text-center h-full'>
              <option></option>
              <option>oz</option>
              <option>fl. oz</option>
              <option>g</option>
              <option>lb</option>
              <option>ml</option>
              <option>cup</option>
            </select>
            <input
              type='text'
              className='col-span-5 rounded-r-md text-gray-900 px-4 h-full'
            /> */}
          {/* <div className='ingredient-buttons col-span-1 flex justify-center gap-4 items-center'>
            <div className='w-8 aspect-square bg-white'></div>
          </div> */}
          {/* </div> */}
          {/* <button
            type='button'
            className='col-span-2 border border-gray-400 text-center rounded-md text-base h-full'
          >
            Add Ingredients
          </button> */}
        </section>
        <section
          id='procedure-section'
          className='col-span-8 grid grid-cols-8 auto-rows-[56px] gap-y-4 self-start w-full items-center'
        >
          <h2 className='col-span-8 text-3xl'>Procedure</h2>
          <div className='procedure-group grid grid-cols-8 col-span-full h-full'>
            <input
              type='text'
              className='col-span-7 rounded-md text-gray-900 px-4'
            />
            <div className='procedure-buttons flex items-center justify-center gap-4 col-span-1'>
              <div className='w-8 aspect-square bg-white'></div>
              <div className='w-8 aspect-square bg-gray-500'></div>
            </div>
          </div>
          {/* <div className='procedure-group grid grid-cols-8 col-span-full'>
            <input type='text' className='col-span-7 rounded-md' />
            <div className='procedure-buttons flex items-center justify-center gap-4 col-span-1'>
              <div className='w-8 aspect-square bg-white'></div>
              <div className='w-8 aspect-square bg-gray-500'></div>
            </div>
          </div>
          <div className='procedure-group grid grid-cols-8 col-span-full'>
            <input type='text' className='col-span-7 rounded-md' />
            <div className='procedure-buttons flex items-center justify-center gap-4 col-span-1'>
              <div className='w-8 aspect-square bg-white'></div>
              <div className='w-8 aspect-square bg-gray-500'></div>
            </div>
          </div>
          <div className='procedure-group grid grid-cols-8 col-span-full'>
            <input type='text' className='col-span-7 rounded-md' />
            <div className='procedure-buttons flex items-center justify-center gap-4 col-span-1'>
              <div className='w-8 aspect-square bg-white'></div>
              <div className='w-8 aspect-square bg-gray-500'></div>
            </div>
          </div> */}
          <button
            type='button'
            className='col-span-2 border border-gray-400 text-center rounded-md text-base h-full'
          >
            Add Steps
          </button>
        </section>
      </form>
    </StandardMainContainer>
  );
}
