import Image from 'next/image';
import React, { useState } from 'react';
import LeftNavCard from './LeftNavCard';

type LeftNavCardContainerProps = {
  title: string;
};

export default function LeftNavCardContainer({
  title,
}: LeftNavCardContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setIsOpen((prev) => !prev)}
        className={`category-card h-20 flex-shrink-0 w-full flex items-center justify-between border-b border-gray-400 cursor-pointer bg-gray-700 text-2xl px-6 font-bold`}
      >
        {title}
        <Image
          className={`origin-center transition-transform duration-100 ${
            isOpen ? '' : '-rotate-90'
          }`}
          alt={`expand "${title}" container`}
          src={'/icons/chevron.svg'}
          width={26}
          height={15}
        />
      </article>
      {isOpen && (
        <>
          <LeftNavCard variant='sub-item'>Test Card</LeftNavCard>
          <LeftNavCard variant='sub-item'>Test Card</LeftNavCard>
          <LeftNavCard variant='sub-item'>Test Card</LeftNavCard>
        </>
      )}
    </>
  );
}
