import type { PropsWithChildren } from 'react';

export default function TagBadge({ children = 'TagName' }: PropsWithChildren) {
  return (
    <div className='bg-slate-500 rounded-full w-fit flex items-center justify-center px-2 text-xs'>
      {children}
    </div>
  );
}
