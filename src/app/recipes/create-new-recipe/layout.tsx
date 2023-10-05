import type { ReactNode } from 'react';
import SectionHeader from '../_components/SectionHeader';
import CreateNewRecipesLeftNav from './_components/CreateNewRecipesLeftNav';

type CreateNewRecipeLayoutProps = {
  children: ReactNode;
};

export default function CreateNewRecipeLayout({
  children,
}: CreateNewRecipeLayoutProps) {
  return (
    <>
      <SectionHeader sectionTitle='Add New Recipe' />
      <section className='flex justify-between items-start h-[calc(100vh_-_80px_-_128px)] overflow-y-hidden w-full'>
        <CreateNewRecipesLeftNav />
        {children}
      </section>
    </>
  );
}
