import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from 'react-hook-form';

import type { FormInputs } from '@/lib/validators/newRecipeFormInput';

import GroupContainer from './GroupContainer';
import React from 'react';
import ButtonContainer from './ButtonContainer';
import Button from './Button';

export type GroupType = 'ingredientGroups' | 'procedureGroups';

type GroupListingProps = {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
  groupType: GroupType;
};

export default function GroupListing({
  control,
  register,
  groupType,
}: GroupListingProps) {
  const {
    fields,
    append,
    remove: removeGroup,
  } = useFieldArray({
    name: groupType,
    control,
  });

  const groupList = fields.map(({ id, groupTitle }, groupIndex) => (
    <React.Fragment key={id}>
      <GroupContainer
        {...{
          control,
          groupIndex,
          register,
          removeGroup,
          groupTitle,
          groupType,
        }}
        key={id}
      />
    </React.Fragment>
  ));

  function appendNewGroup() {
    if (groupType === 'ingredientGroups') {
      append({ groupTitle: '', ingredients: [{ description: '' }] });
    } else if (groupType === 'procedureGroups') {
      append({ groupTitle: '', procedureSteps: [{ description: '' }] });
    } else throw new Error('Cannot append group type: invalid type provided.');
  }

  return (
    <>
      {groupList}
      <ButtonContainer>
        <Button onClick={appendNewGroup}>Create New Group</Button>
      </ButtonContainer>
    </>
  );
}
