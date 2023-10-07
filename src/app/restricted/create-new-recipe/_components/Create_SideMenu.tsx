import LeftNav from '@/app/components/LeftNav';
import LeftNavCard from '@/app/components/LeftNavCard';
import React, { type BaseSyntheticEvent } from 'react';
import CreateTagsContainer from './Create_TagsContainer';
import { Tag } from '.prisma/client';

type CreateSideMenuProps = {
  toggleTag: (tag: Tag) => void;
  selectedTags?: Map<string, Tag>;
  submitForm: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  resetForm: () => void;
};

export default function CreateSideMenu({
  toggleTag,
  selectedTags,
  submitForm,
  resetForm,
}: CreateSideMenuProps) {
  return (
    <LeftNav>
      <CreateTagsContainer {...{ toggleTag, selectedTags }} />
      <LeftNavCard onClick={submitForm}>Save Recipe</LeftNavCard>
      <LeftNavCard onClick={resetForm}>Clear Form</LeftNavCard>
    </LeftNav>
  );
}
