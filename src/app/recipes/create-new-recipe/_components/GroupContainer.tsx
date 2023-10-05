import { useEffect } from 'react';
import { useFieldArray, type UseFieldArrayRemove } from 'react-hook-form';
import type { Control, UseFormRegister } from 'react-hook-form';
import type { FormInputs } from '../page';
import type { GroupType } from './GroupsListing';
import IngredientItem from './IngredientItem';
import Button from './Button';
import ProcedureStepItem from './ProcedureStepItem';
import ButtonContainer from './ButtonContainer';

type GroupContainerProps = {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
  groupIndex: number;
  groupTitle: string;
  groupType: GroupType;
  removeGroup: UseFieldArrayRemove;
};

export default function GroupContainer({
  control,
  register,
  groupIndex,
  groupTitle,
  removeGroup,
  groupType,
}: GroupContainerProps) {
  const {
    fields,
    remove: removeMember,
    append,
  } = useFieldArray({
    name: getFieldArrayName(),
    control,
  });

  const groupMembers = fields.map((field, index) => {
    if (groupType === 'ingredientGroups')
      return (
        <IngredientItem
          key={field.id}
          {...{
            ingredientIndex: index,
            groupIndex,
            register,
            removeMember,
          }}
        />
      );

    if (groupType === 'procedureGroups')
      return (
        <ProcedureStepItem
          key={field.id}
          {...{ procedureIndex: index, groupIndex, register, removeMember }}
        />
      );
  });

  const addButtonCaptions = {
    ingredientGroups: 'Add Ingredients',
    procedureGroups: 'Add Steps',
  };

  useEffect(() => {
    // remove group if all ingredients are deleted
    if (groupMembers.length < 1) removeGroup(groupIndex);
  }, [groupMembers.length]);

  return (
    <>
      {groupTitle !== '' && <h3>{groupTitle}</h3>}
      {groupMembers}
      <ButtonContainer>
        <Button onClick={() => append({ description: '' })}>
          {addButtonCaptions[groupType]}
        </Button>
        <Button onClick={() => removeGroup(groupIndex)}>
          Remove This Group
        </Button>
      </ButtonContainer>
    </>
  );

  function getFieldArrayName() {
    const memberMap = {
      ingredientGroups: 'ingredients',
      procedureGroups: 'procedureSteps',
    };

    return `${groupType}.${groupIndex}.${memberMap[groupType]}` as
      | 'ingredientGroups.0.ingredients'
      | 'procedureGroups.0.procedureSteps';
  }
}
