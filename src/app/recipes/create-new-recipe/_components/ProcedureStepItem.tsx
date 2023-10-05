import type { UseFieldArrayRemove } from 'react-hook-form';
import Button from './Button';

type ProcedureStepItemProps = {
  procedureIndex: number;
  removeMember: UseFieldArrayRemove;
};

export default function ProcedureStepItem({
  removeMember,
  procedureIndex,
}: ProcedureStepItemProps) {
  function createTimer() {
    // TODO:
    console.log('still have to finish this part');
  }

  return (
    <div className='procedure-step grid grid-cols-8 col-span-full h-full'>
      <input type='text' className='col-span-7 rounded-md text-gray-900 px-4' />
      <div className='ingredient-buttons col-span-1 flex justify-center gap-4 items-center'>
        <Button border='none' onClick={() => removeMember(procedureIndex)}>
          <div className='w-6 aspect-square bg-white'></div>
        </Button>
        <Button border='none' onClick={createTimer}>
          <div className='w-6 aspect-square bg-gray-400'></div>
        </Button>
      </div>
    </div>
  );
}
