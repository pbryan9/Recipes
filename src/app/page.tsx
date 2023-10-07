import Link from 'next/link';

export default function Home() {
  return (
    <main className='p-6 basis-8/12 flex flex-col gap-5 overflow-y-auto h-full'>
      <h1>Home</h1>
      <Link href='/recipes'>Recipes</Link>
      <Link href='/restricted/create-new-recipe'>New Recipe Form</Link>
    </main>
  );
}
