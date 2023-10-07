import LeftNav from '@/app/components/LeftNav';
import LeftNavCard from '@/app/components/LeftNavCard';
import LeftNavCardContainer from '@/app/components/LeftNavCardContainer';
import { FormInputs } from '@/lib/validators/newRecipeFormInput';
import React, { type BaseSyntheticEvent } from 'react';
import CreateTagsContainer from './Create_TagsContainer';

type CreateSideMenuProps = {
  submitForm: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  resetForm: () => void;
  children: React.ReactNode;
};

export default function CreateSideMenu({
  submitForm,
  resetForm,
  children,
}: CreateSideMenuProps) {
  return (
    <LeftNav>
      {children}
      <LeftNavCard onClick={submitForm}>Save Recipe</LeftNavCard>
      <LeftNavCard onClick={resetForm}>Clear Form</LeftNavCard>
    </LeftNav>
  );
}
