import type { UseFieldArrayRemove } from 'react-hook-form';
import Button from './Button';

type IngredientItemProps = {
  ingredientIndex: number;
  removeMember: UseFieldArrayRemove;
};

export default function IngredientItem({
  removeMember,
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
        <Button border='none' onClick={() => removeMember(ingredientIndex)}>
          <div className='w-6 aspect-square bg-white'></div>
        </Button>
      </div>
    </div>
  );
}
