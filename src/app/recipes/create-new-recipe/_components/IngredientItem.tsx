import type { UseFieldArrayRemove } from 'react-hook-form';

type IngredientItemProps = {
  groupIndex: number;
  ingredientIndex: number;
  remove: UseFieldArrayRemove;
};

export default function IngredientItem({
  remove,
  groupIndex,
  ingredientIndex,
}: IngredientItemProps) {
  return (
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
      />
      <div className='ingredient-buttons col-span-1 flex justify-center gap-4 items-center'>
        <button
          type='button'
          onClick={() => remove(ingredientIndex)}
          className='w-8 aspect-square bg-white'
        ></button>
      </div>
    </div>
  );
}
