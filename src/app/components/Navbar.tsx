import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex space-between w-full bg-slate-600 text-slate-50 py-4'>
      <div>
        <Link href='/' className=''>
          Steffy&apos;s Recipes
        </Link>
      </div>
    </nav>
  );
}
