// import {
//   useFieldArray,
//   type Control,
//   type UseFormRegister,
// } from 'react-hook-form';

// import type { FormInputs } from '../../page';
// import IngredientGroup from './IngredientGroup';
// import React from 'react';

// type IngredientGroupsProps = {
//   control: Control<FormInputs, any>;
//   register: UseFormRegister<FormInputs>;
// };

// export default function IngredientGroupsListing({
//   control,
//   register,
// }: IngredientGroupsProps) {
//   const { fields, append, remove } = useFieldArray({
//     name: 'ingredientGroups',
//     control,
//   });

//   const groupList = fields.map((field, groupIndex) => (
//     <React.Fragment key={field.id}>
//       <IngredientGroup
//         {...{
//           control,
//           groupIndex,
//           register,
//           remove,
//           groupTitle: field.groupTitle,
//         }}
//         key={field.id}
//       />
//     </React.Fragment>
//   ));

//   return (
//     <>
//       {groupList}
//       <section className='col-span-full h-full grid grid-cols-8 gap-4'>
//         <button
//           type='button'
//           onClick={() =>
//             append({ groupTitle: '', ingredients: [{ description: '' }] })
//           }
//           className='col-span-2 border border-gray-400 text-center rounded-md text-base h-full'
//         >
//           Create New Group
//         </button>
//       </section>
//     </>
//   );
// }
