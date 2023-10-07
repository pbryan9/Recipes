'use client';

import React, { useEffect, useState } from 'react';

import LeftNavCard from '@/app/components/LeftNavCard';
import LeftNavCardContainer from '@/app/components/LeftNavCardContainer';

import { Tag, type $Enums } from '@prisma/client';

type CreateTagsContainerProps = {};

export default function CreateTagsContainer({}: CreateTagsContainerProps) {
  const [tags, setTags] = useState<[string, Tag[]][] | null>(null);

  useEffect(() => {
    async function fetchTags() {
      const res = await fetch('/api/tags');
      const data = await res.json();
      return data;
    }

    fetchTags().then((tagData) => {
      setTags(arrangeTagsByGroup(tagData));
    });
  }, []);

  function arrangeTagsByGroup(tags: Tag[]) {
    const groupedTagsMap = new Map<string, typeof tags>();

    tags.forEach((tag) => {
      let groupName = tag.tagGroup || 'Uncategorized';

      if (groupedTagsMap.has(groupName)) {
        groupedTagsMap.get(groupName)?.push(tag);
      } else groupedTagsMap.set(groupName, [tag]);
    });

    const groupedTags = Array.from(groupedTagsMap.entries());

    return groupedTags;
  }

  return (
    <LeftNavCardContainer title='Add Tags'>
      {tags?.length &&
        tags.map(([groupTitle, tags]) => {
          return (
            <LeftNavCardContainer
              key={groupTitle}
              variant='sub-container'
              title={`${groupTitle.toLowerCase()} tags`}
            >
              {tags.map((tag) => (
                <LeftNavCard key={tag.id} variant='sub-sub-item'>
                  {tag.description.toLowerCase()}
                </LeftNavCard>
              ))}
            </LeftNavCardContainer>
          );
        })}
    </LeftNavCardContainer>
  );
}
