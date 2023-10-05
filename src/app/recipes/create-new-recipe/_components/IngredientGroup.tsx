import { useEffect } from 'react';
import { useFieldArray, type UseFieldArrayRemove } from 'react-hook-form';
import type { Control, UseFormRegister } from 'react-hook-form';
import type { FormInputs } from '../page';
import IngredientItem from './IngredientItem';
import Button from './Button';

type IngredientGroupProps = {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
  groupIndex: number;
  groupTitle: string;
  remove: UseFieldArrayRemove;
};

export default function IngredientGroup({
  control,
  register,
  groupIndex,
  groupTitle,
  remove: removeGroup,
}: IngredientGroupProps) {
  const { fields, remove, append } = useFieldArray({
    name: `ingredientGroups.${groupIndex}.ingredients`,
    control,
  });

  const ingredientList = fields.map((field, ingredientIndex) => (
    <IngredientItem
      key={field.id}
      {...{ groupIndex, ingredientIndex, remove }}
    />
  ));

  useEffect(() => {
    // remove group if all ingredients are deleted
    if (ingredientList.length < 1) removeGroup(groupIndex);
  }, [ingredientList.length]);

  return (
    <>
      {groupTitle !== '' && <h3>{groupTitle}</h3>}
      {ingredientList}
      <section className='col-span-8 grid grid-cols-8 w-full h-full gap-4'>
        <Button onClick={() => append({ description: '' })}>
          Add Ingredients
        </Button>
        <Button onClick={() => removeGroup(groupIndex)}>
          Remove This Group
        </Button>
      </section>
    </>
  );
}

// <div
//   key={field.id}
//   className='ingredient-group grid grid-cols-8 col-span-full h-full'
// >
//   <input
//     type='number'
//     className='col-span-1 rounded-l-md border-r border-gray-400 text-gray-900 text-center h-full'
//   />
//   <select className='col-span-1 border-r border-gray-400 text-gray-900 text-center h-full'>
//     <option></option>
//     <option>oz</option>
//     <option>fl. oz</option>
//     <option>g</option>
//     <option>lb</option>
//     <option>ml</option>
//     <option>cup</option>
//   </select>
//   <input
//     type='text'
//     className='col-span-5 rounded-r-md text-gray-900 px-4 h-full'
//   />
//   <div className='ingredient-buttons col-span-1 flex justify-center gap-4 items-center'>
//     <div className='w-8 aspect-square bg-white'></div>
//   </div>
// </div>
