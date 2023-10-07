import React from 'react';

type LeftNavCardProps = {
  children: React.ReactNode;
};

export default function LeftNavCard({ children }: LeftNavCardProps) {
  return (
    <article className='category-card bg-gray-700 h-20 flex-shrink-0 w-full flex items-center px-6 text-2xl border-b border-gray-400'>
      {children}
    </article>
  );
}
