import type { PropsWithChildren } from 'react';

export default function LeftNavCard({ children }: PropsWithChildren) {
  return (
    <article className='category-card bg-gray-700 h-20 flex-shrink-0 w-full flex items-center px-6 text-2xl border-b border-gray-400'>
      {children}
    </article>
  );
}
